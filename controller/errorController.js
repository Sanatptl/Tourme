const mongoose = require('mongoose');
const AppError = require('./../utils/appError');

const handleCastErrDB = (err) => {
  const msg = `Invalid ${err.path} ${err.value}`;
  return new AppError(msg, 400);
};

//

const handleDuplicateFieldName = (err) => {
  const val = err.keyValue.name;
  const msg = `duplicate field name: "${val}", please enter valid name!`;
  return new AppError(msg, 400);
};
//

const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send error message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
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
    // console.log('lag gaye');
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // convert DB error into our custom meaningfull error for clients
    let error = { ...err };
    // if (error.name === 'CastError') {
    if (err instanceof mongoose.CastError) {
      error = handleCastErrDB(error);
      // console.log('oops!');
    }
    if (err.code === 11000) error = handleDuplicateFieldName(error);
    sendErrorProd(error, res);
  }
};

// module.exports = errorController;
