const { promisify } = require('util'); //node buit-in utility package
const crypto = require('crypto'); //node buit-in utility package
const User = require('./../models/userModel');
const catchAsyncFn = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  // send cookie also
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true,
    httpOnly: true,
    // sameSite: 'none',
    domain: '127.0.0.1',
    path: '/',
  };

  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;

  res.cookie('jwt', token, cookieOption);
  //remove the "password" from the outputs
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

//

exports.signUp = catchAsyncFn(async (req, res, next) => {
  //   const newUser = await User.create(req.body);//deprecated bcz anyone can defined the role as admin
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  sendToken(newUser, 201, res);
});

//

exports.login = catchAsyncFn(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email);
  // 1) check if email and passwors are entered
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) check if user exist & password is correct
  const user = await User.findOne({ email }).select('+password');
  // const correct = await user.isPasswordCorrect(password, user.password); //but the prob with this line is it will run even if there's no such user
  if (!user || !(await user.isPasswordCorrect(password, user.password))) {
    return next(
      new AppError('Incorrect email or password, Please enter correctly!', 401)
    );
  }

  // 3) if everythig ok, send token to client
  // const token = generateToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
  sendToken(user, 200, res);
});

//

exports.protect = catchAsyncFn(async (req, res, next) => {
  // 1) getting token and check if it's exist
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log(token);
  if (!token)
    return next(
      new AppError("you're not logged in! please log in to get access.", 401)
    );

  // 2) validate token(varification) : to verify if someone has manipulate the payload or token has expired or not
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded); //payload object

  // 3) check if user still exist
  const userPresentInDB = await User.findById(decoded.id);
  // console.log(userPresentInDB);

  if (!userPresentInDB) {
    return next(
      new AppError('The user beloging to this token does no longer exist!', 401)
    );
  }
  // 4) if user changed password after token was issued
  if (userPresentInDB.checkPasswordChanged(decoded.iat)) {
    return next(new AppError('User recently changed password', 401));
  }

  req.user = userPresentInDB;
  // console.log(req.user);
  next();
});

//

exports.authAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you're not autorized for perform this task!", 403)
      );
    }
    next();
  };
};

//

exports.forgotPassword = async (req, res, next) => {
  // 1) getting actual user
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new AppError("oops! there's no user with this email", 404));
  }

  // 2) Generate random token (here we use less secure buit-in node module called crypto)
  const resetToken = user.createPasswordResetToken(); // we've just updated the doc
  await user.save({ validateBeforeSave: false }); // no we are actually saving the data into DB

  // 3) sent token to the client as in reset url link
  const url = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${url}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token(valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordTokenExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
};

//

exports.resetPassword = catchAsyncFn(async (req, res, next) => {
  // 1)get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordTokenExpiresIn: { $gt: Date.now() },
  });

  // 2)if token has not expired, and if there is user, than re-set password
  if (!user) {
    return next(new AppError('Token is invalid or has expired!', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordTokenExpiresIn = undefined;
  await user.save();
  // 3)update changedpassword property in DB for the user
  // 4) log the user in , send JWT
  sendToken(user, 200, res);
});

//

exports.updatePassword = async (req, res, next) => {
  // 1)Get user from DB
  const user = await User.findById(req.user.id).select('+password');

  // 2) check pass is correect or not
  if (
    !(await user.isPasswordCorrect(req.body.currentPassword, user.password))
  ) {
    return next(
      new AppError('incorrect password, please enter correct one', 401)
    );
  }
  // 3) if so, update pass
  user.Password = req.body.newPassword;
  user.passwordConfirm = req.body.confirmPassword;
  await user.save();

  // 4) let log in , send jwt
  sendToken(user, 200, res);
};

//

exports.isLoggedIn = catchAsyncFn(async (req, res, next) => {
  // 1) getting token and check if it's exist

  if (!req.cookies.jwt)
    return next(
      new AppError("you're not logged in! please log in to get access.", 401)
    );

  // 2) validate token(varification) : to verify if someone has manipulate the payload or token has expired or not
  const decoded = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRET
  );
  // console.log(decoded); //payload object

  // 3) check if user still exist
  const userPresentInDB = await User.findById(decoded.id);
  // console.log(userPresentInDB);

  if (!userPresentInDB) {
    return next(
      new AppError('The user beloging to this token does no longer exist!', 401)
    );
  }
  // 4) if user changed password after token was issued
  if (userPresentInDB.checkPasswordChanged(decoded.iat)) {
    return next(new AppError('User recently changed password', 401));
  }
  res.status(200).json({ satus: 'success', data: userPresentInDB });
  // console.log(req.user);
});

//

exports.logOut = (req, res, next) => {
  //here we basicly override the jwt token
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};
