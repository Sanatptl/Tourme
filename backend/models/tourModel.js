const mongoose = require('mongoose');
const User = require('./userModel');
const Reviews = require('./reviewModel');

//mongoose schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
    },
    duration: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // 'this' only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, //this option will exclude this field right from the Schema
    },
    startDates: [Date],
    rating: {
      type: Number,
      default: 4.7,
    },

    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: { type: String, default: 'Point', enum: ['Point'] },

        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//
//virtual populating
tourSchema.virtual('reviews', {
  // path: Reviews,
  ref: Reviews,
  foreignField: 'tour', // field name in the other model
  localField: '_id', // id in the current model
});

tourSchema.index({ price: 1 }); //improve mongoDB querry execution
tourSchema.index({ startLocation: '2dsphere' }); //not 1 or -1 bcz its geospatial data
//

//document middleware : runs before .save() and .create()
// tourSchema.pre('save', function (next) {
//   console.log(this);
//   this.name = 'zarkdsg';
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

//query middleware
tourSchema.pre(/^find/, function (next) {
  // used regEx to find all the string that start with 'find'
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({ path: 'guides', select: '-__v -password' });
  next();
});

// tourSchema.pre('find', function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });

//Aggregation middleware
tourSchema.pre('aggregate', function (next) {
  // console.log(this);
  console.log(
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })
  );
  next();
});

//mongoose model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

// validation and sanitization : basically means that the data come from a user is validate or not, in simpler way,it is checking the entered values are in rignt format for every fields in our schema
//golden standard in back-end: to NEVER EVER accept input data as it is
