const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsyncFn = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const handlerFunction = require('../controller/handlerFunction');

//

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsyncFn(async (req, res, next) => {
  if (!req.file) return next();
  if (req.user) req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  req.file.filename = `user-${req.body.email}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

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
  // console.log(req.file);
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
  if (req.file) filteredBody.photo = req.file.filename;
  // console.log(req.user.id);

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
