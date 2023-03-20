const mongoose = require('mongoose');
const User = require('./userModel');
const tourController = require('./../controller/tourController');
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
      // maxLength: 150,
    },
    rating: { type: Number, default: 4.3, min: 1, max: 5 },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: { type: mongoose.Schema.ObjectId, ref: 'Tour' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//

//ensuring one user cannot write multiple review for the same tour
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

//

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  // .populate({
  //   path: 'tour',
  //   select: 'name',
  // });
  next();
});

reviewSchema.statics.calcRatingAvg = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        ratingAvg: { $avg: '$rating' },
        nRating: { $count: {} },
      },
    },
  ]);
  // console.log(stats);
  if (stats.length > 0) {
    tourController.updateRating(tourId, stats[0].ratingAvg, stats[0].nRating);
  } else {
    tourController.updateRating(tourId, 4.5, 0);
  }
};

//document middleware
reviewSchema.post('save', async function () {
  this.constructor.calcRatingAvg(this.tour); // this.constructor points the current Model
});

//

//query middleware
//on query middleware we do not directly have access to the document, like we had on doc midd
//behind the scene "findByIdAndUpdate/Delete"  is only a shorthand for findOneAndUpdate/Delete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.review = await this.findOne(); //retrieving doc and then store it on the current query object variable
  // console.log(this.review);
  // console.log(this);
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // console.log(this.review);
  await this.review.constructor.calcRatingAvg(this.review.tour); //The reason we are using await in here is that we want to make sure that the review document has been updated in the database before we call the calcRatingAvg function.
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
