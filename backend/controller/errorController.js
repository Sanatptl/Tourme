const mongoose = require('mongoose');
const AppError = require('./../utils/appError');

//

const handleCastErrDB = (err) => {
  const msg = `Invalid ${err.path} ${err.value}`;
  return new AppError(msg, 400);
};

//

const handleValidationErrDB = (err) => {
  const errors = err.errors;
  for (const path in errors) {
    return new AppError(`${errors[path].message}`, 400);
  }
};

//

const handleDuplicateFieldName = (err) => {
  const val = err.keyValue.name ? err.keyValue.name : err.keyValue.email;
  const msg = `duplicate field name: "${val}", please enter valid name!`;
  return new AppError(msg, 400);
};

//

const handleJWTError = () =>
  new AppError('Invalid token! Please log in again!', 401);

//

const handleTokenExpiredError = () =>
  new AppError('your token has expired! log in again!', 401);

//

const sendErrorDev = (err, res) => {
  // if (err instanceof mongoose.Error.ValidationError) {
  //   const errors = err.errors;
  //   for (const path in errors) {
  //     res
  //       .status(err.statusCode)
  //       .json({ message: `${path}: ${errors[path].message}` });
  //   }
  // }
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send error message to the client
  // console.log(err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Error🔥', err);
    //programming or unknown err: dont leak error details
    res.status(500).json({
      status: 'error',
      message: 'something went wrong!',
    });
  }
};

//

// const errorController = (err, req, res, next) => {
exports.errorController = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // convert DB error into our custom meaningfull error for clients
    // console.log(err);
    // let error = { ...err };
    // console.log(error);
    if (err instanceof mongoose.Error.ValidationError)
      err = handleValidationErrDB(err);

    if (err.name === 'CastError') {
      // if (err instanceof mongoose.CastError) {
      err = handleCastErrDB(err);
      // console.log('oops!');
    }
    if (err.code === 11000) err = handleDuplicateFieldName(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleTokenExpiredError();

    sendErrorProd(err, res);
  }
};

// module.exports = errorController;
