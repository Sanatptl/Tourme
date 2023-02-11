const Tour = require('./../models/tourModel');
// import APIfeatures from './../utils/apiFeatures';
const APIfeatures = require('./../utils/apiFeatures');

//
exports.bestTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,duration,difficulty';
  next();
};

exports.createTour = async (req, res) => {
  try {
    // console.log(req.body);

    // const newTour = new Tour({});
    // newTour.save().then();

    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      Error: err,
    });
  }
};

exports.getTours = async (req, res) => {
  try {
    const api = new APIfeatures(Tour.find(), req.query);
    api.filter().sort().page().fields();

    const tours = await api.query; // put 'await' here bcz we are not able to use sort, limit like methods directaly on promise if it is fullfilled
    if (!tours.length) {
      res.status(404).json({
        status: 'Fail',
        message: 'No data found!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      // status: err,
      status: 'something went wrong',
      Error: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.ID);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (e) {
    res.status(501).json({
      status: 'Bad request',
    });
  }
  // console.log(req.params);
};

exports.updateTour = async (req, res) => {
  const updatedTour = await Tour.findByIdAndUpdate(
    req.params.ID,
    req.body,
    {
      new: true,
      runValidators: true,
    },
    (err, doc) => {
      if (err) throw err;
      console.log(doc);
    }
  );
  res.status(201).json({
    status: 'success',
    data: updatedTour,
  });
};

exports.deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.ID);
    res.status(204).json({
      status: 'success',
    });
  } catch (e) {
    res.status(404).json({
      status: 'Fail',
    });
  }
};
