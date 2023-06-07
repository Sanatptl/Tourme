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
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://tourmee.netlify.app'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

//middleware (to get req body object)
app.use(express.json());

// security http headers
app.use(helmet());

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
app.use(compression());

// Body parser, reading data from body into req.body
// app.use(bodyParser.json({ strict: true, limit: '10kb' })); //middleware
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`)); //provide a way to load static file (e.g. html,img etc)

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

/*
///////////initial code/////////////

app.get('/api/v1/tours', (req, res) => {
  // res.send('hello from the server side!!!');
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: {
      tours: toursData,
    },
  });
});

////////////////get specific data//////////////////

// By adding colon before variable name in the route we can create variable (e.g. here's ID)

app.get('/api/v1/tours/:ID', (req, res) => {
  // console.log(req.params);
  const id = req.params.ID * 1;
  const tour = toursData.find((ele) => ele.id === id);
  if (!tour) {
    return res.status(404).send('INVALID ID');
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = toursData[toursData.length - 1].id + 1;
  const newObj = { id: newId, ...req.body };
  toursData.push(newObj);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursData),
    (err) => {
      if (err) throw err;
      res.status(201).json({
        status: 'success',
        data: {
          tour: newObj,
        },
      });
    }
  );

  // res.send('successfully done!');
});

app.listen(8000, '127.0.0.1', () =>
  console.log('server is up and running on port:8000')
);
*/

/*
///////////////refactoring////////////////

const getTours = (req, res) => {
  // res.send('hello from the server side!!!');
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: {
      tours: toursData,
    },
  });
};

const getTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.ID * 1;
  const tour = toursData.find((ele) => ele.id === id);
  if (!tour) {
    return res.status(404).send('INVALID ID');
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  console.log(req.body);
  const newId = toursData[toursData.length - 1].id + 1;
  const newObj = { id: newId, ...req.body };
  toursData.push(newObj);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursData),
    (err) => {
      if (err) throw err;
      res.status(201).json({
        status: 'success',
        data: {
          tour: newObj,
        },
      });
    }
  );
};

const getUsers = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const getUser = (req, res) => {
  res.send('This route is not yet defined!');
};

app.route('/api/v1/tours').get(getTours).post(createTour);
app.route('/api/v1/tours/:ID').get(getTour);

app.route('/api/v1/users').get(getUsers).post(createUser);
app.route('/api/v1/users/:ID').get(getUser);

app.listen(8000, '127.0.0.1', () =>
  console.log('server is up and running on port:8000')
);
*/

/*
////////////////route mounting////////////////

const tourRouter = express.Router();
const userRouter = express.Router();

const getTours = (req, res) => {
  // res.send('hello from the server side!!!');
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: {
      tours: toursData,
    },
  });
};

const getTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.ID * 1;
  const tour = toursData.find((ele) => ele.id === id);
  if (!tour) {
    return res.status(404).send('INVALID ID');
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  console.log(req.body);
  const newId = toursData[toursData.length - 1].id + 1;
  const newObj = { id: newId, ...req.body };
  toursData.push(newObj);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursData),
    (err) => {
      if (err) throw err;
      res.status(201).json({
        status: 'success',
        data: {
          tour: newObj,
        },
      });
    }
  );
};

const getUsers = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const getUser = (req, res) => {
  res.send('This route is not yet defined!');
};

tourRouter.route('/').get(getTours).post(createTour);
tourRouter.route('/:ID').get(getTour);

userRouter.route('/').get(getUsers).post(createUser);
userRouter.route('/:ID').get(getUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.listen(8000, '127.0.0.1', () =>
  console.log('server is up and running on port:8000')
);
*/
