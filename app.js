'use strict';

// const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

/////////////top-level code///////////////
// console.log('restart happened!');
// const toursData = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );
// console.log(toursData.length);

/////////////////server///////////////////

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
///////////////Middleware/////////////////
// app.use(express.json()); //middleware (to get req body object)
app.use(bodyParser.json({ strict: true })); //middleware
app.use(express.static(`${__dirname}/public`)); //provide a way to load static file (e.g. html,img etc)

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

/////////////file seperation//////////////

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
