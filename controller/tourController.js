const fs = require('fs');
const Tour = require('./../models/tourModel');

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//

exports.checkId = (req, res, next, val) => {
  if (req.params.ID * 1 > toursData.length) {
    res.status(404).send('INVALID ID');
  }
  next(); //when you create your own middleware don't forget to call next fn
};

exports.checkBody = (req, res, next) => {
  // if('name' in req.body && 'price' in req.body){
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'not found',
      message: 'missing name or price',
    });
  }
  next();
};

//

exports.getTours = (req, res) => {
  // res.send('hello from the server side!!!');
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: {
      tours: toursData,
    },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.ID * 1;
  const tour = toursData.find((ele) => ele.id === id);

  // if (!tour) {
  //   return res.status(404).send('INVALID ID');
  // }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  const newId = toursData[toursData.length - 1].id + 1;
  const newObj = { id: newId, ...req.body };
  toursData.push(newObj);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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
