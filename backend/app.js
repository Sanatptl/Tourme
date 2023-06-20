'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalError = require('./controller/errorController');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute');

/////////////top-level code///////////////
// console.log('restart happened!');
// const toursData = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );
// console.log(toursData.length);

/////////////////server///////////////////

const app = express();

///////////////Middleware/////////////////

//allow access to cors
// Make sure you have added the cors middleware to your Express app before any other middleware that might send responses (such as body parsers or error handlers) and before other middleware that may handle the request, (e.g. including the express.json() middleware). This is important because the cors middleware needs to set the appropriate headers on the response before it is sent to the client.
// app.use(cors({ origin: '*' })); //allow to all

//middleware (to get req body object)
app.use(express.json());

app.use(
  cors({
    origin: 'https://tourmee.netlify.app',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

// security http headers
// app.use(helmet());

// Developmeant logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  max: 100, // 50 req per {windowMs}
  windowMs: 60 * 60 * 1000, // 1hr
  message: 'Too many requests! please try again after some time',
});

app.use('/api', limiter);

// Data sanitization against NoSql querry injection (e.g. loggin user based on email: {$ne: ""})
app.use(mongoSanitize());
// Data sanitization against cross-site script (XSS)
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//compress response text/data
// app.use(compression());

// Body parser, reading data from body into req.body
// app.use(bodyParser.json({ strict: true, limit: '10kb' })); //middleware
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static(`public`)); //provide a way to load static file (e.g. html,img etc)

app.use(cookieParser());
// for testing purpose middleware
app.use((req, res, next) => {
  // console.log(req.cookies);
  next();
});

/////////////file seperation//////////////

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `can't find ${req.originalUrl} on this server`,
  // });

  //

  // const err = new Error(`can't find ${req.originalUrl} on this server`);
  // err.statusCode = 404;
  // err.status = 'fail';
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404)); //when we pass any argument in next then express will automaticlly indentifies it's an error and skip all further middleware in the stack
});

//express global-error-handler middleware
app.use(globalError.errorController);
module.exports = app;
