const Tour = require('./../models/tourModel');
// import APIfeatures from './../utils/apiFeatures';
const catchAsyncFn = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const handlerFunction = require('./handlerFunction');

//

exports.bestTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,duration,difficulty';
  next();
};

//

exports.createTour = handlerFunction.createOne(Tour);

//

exports.getTours = handlerFunction.getAll(Tour);
// exports.getTours = catchAsyncFn(async (req, res, next) => {
//   const api = new APIfeatures(Tour.find(), req.query);
//   api.filter().sort().page().fields();

//   const tours = await api.query; // put 'await' here bcz we are not able to use sort, limit like methods directaly on promise if it is fullfilled

//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });

//

exports.getOneTour = handlerFunction.getOne(Tour, { path: 'reviews' });
// exports.getTour = catchAsyncFn(async (req, res, next) => {
//   // console.log(req.params);

//   const tour = await Tour.findById(req.params.ID).populate('reviews');
//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });

//   // console.log(req.params);
// });

//

exports.updateTour = handlerFunction.updateOne(Tour);

//

exports.deleteTour = handlerFunction.deleteOne(Tour);
// exports.deleteTour = catchAsyncFn(async (req, res, next) => {
//   const deletedTour = await Tour.findByIdAndDelete(req.params.ID);
//   if (!deletedTour) {
//     return next(new AppError('No tour found with that ID', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//   });
// });

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

//

exports.getTourWithin = catchAsyncFn(async (req, res, next) => {
  const { distance, unit, latlng } = req.params;
  const [lat, lng] = latlng.split(',');

  //convert to a special unit called radian
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitutr and longitude in the format lat,lng.',
        400
      )
    );
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours,
    },
  });
});

//reviewcontroller
exports.updateRating = async function (id, rating, quantity) {
  await Tour.findByIdAndUpdate(id, {
    ratingsAverage: rating,
    ratingsQuantity: quantity,
  });
};
