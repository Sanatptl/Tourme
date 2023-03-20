const User = require('./../models/userModel');
const catchAsyncFn = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const handlerFunction = require('./handlerFunction');

//

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};

  for (let key in obj) {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  }
  // console.log(newObj);
  return newObj;
};

//

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

//

exports.getUsers = handlerFunction.getAll(User);
// exports.getUsers = catchAsyncFn(async (req, res) => {
//   const users = await User.find();
//   res.status(200).json({
//     status: 'success',
//     data: {
//       users,
//     },
//   });
// });
//

//
//get current loged-in user
exports.getMe = (req, res, next) => {
  req.params.ID = req.user.id;
  next();
};

//

//only for email and name
exports.updateMe = catchAsyncFn(async (req, res, next) => {
  // 1) send error if body conatin password property
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'please do prefer "/updatePassowrd" path, in case you want to update your password',
        401
      )
    );
  }
  // 2) Filterd out unwanted fields that are not allowed to be updated
  const filteredBody = filteredObj(req.body, 'name', 'email');
  console.log(req.user.id);
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    updatedUser,
  });
});

//

exports.deleteMe = catchAsyncFn(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

//
exports.updateUser = handlerFunction.updateOne(User);
exports.getOneUser = handlerFunction.getOne(User);
exports.deleteUser = handlerFunction.deleteOne(User);
