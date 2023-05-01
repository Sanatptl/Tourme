const Review = require('./../models/reviewModel');
const handlerFunction = require('./handlerFunction');

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

//

exports.getReviews = handlerFunction.getAll(Review);
// exports.getReviews = catchAsyncFn(async (req, res, next) => {
//   let filterObj = {};
//   if (req.params.tourId) filterObj = { tour: req.params.tourId };
//   const reviews = await Review.find(filterObj);
//   res.status(200).json({
//     result: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });

//
exports.createReview = handlerFunction.createOne(Review);
exports.updateReview = handlerFunction.updateOne(Review);
exports.getOneReview = handlerFunction.getOne(Review);
exports.deleteReview = handlerFunction.deleteOne(Review);
