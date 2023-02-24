const Tour = require('./../models/tourModel');
// import APIfeatures from './../utils/apiFeatures';
const APIfeatures = require('./../utils/apiFeatures');
const catchAsyncFn = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//

exports.bestTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,duration,difficulty';
  next();
};

//

exports.createTour = async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};

//

exports.getTours = catchAsyncFn(async (req, res, next) => {
  const api = new APIfeatures(Tour.find(), req.query);
  api.filter().sort().page().fields();

  const tours = await api.query; // put 'await' here bcz we are not able to use sort, limit like methods directaly on promise if it is fullfilled

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

//

exports.getTour = catchAsyncFn(async (req, res, next) => {
  const tour = await Tour.findById(req.params.ID);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });

  // console.log(req.params);
});

//

exports.updateTour = catchAsyncFn(async (req, res, next) => {
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
});

//

exports.deleteTour = catchAsyncFn(async (req, res) => {
  const deletedTour = await Tour.findByIdAndDelete(req.params.ID);
  if (!deletedTour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
  });
});

//

exports.getTourStats = catchAsyncFn(async (req, res, next) => {
  const stats = await Tour.aggregate([
    // { $match: { price: { $gte: 500 } } },
    // { $count: 'numTour' },
    {
      $group: {
        // _id: '$difficulty',
        _id: { $toUpper: '$difficulty' },
        // _id: '$ratingsAverage',
        // _id: null,
        numTour: { $count: {} }, //'count' is equavelant with 'sum: 1'
        avgRating: { $avg: '$rating' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
      },
    },
    { $sort: { numTour: -1 } },
    // { $match: { _id: { $ne: 'EASY' } } }, // ne:-notEqualto
  ]);

  res.status(200).json({
    data: {
      results: stats.length,
      collection: stats,
    },
  });
});

//

exports.getMonthlyPlan = catchAsyncFn(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    { $unwind: '$startDates' },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numOfTours: { $count: {} },
        Tour: { $push: '$name' },
      },
    },
    { $sort: { _id: 1 } },
    { $addFields: { month: '$_id' } },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: plan.length,
    data: plan,
  });
});
