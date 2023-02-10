const mongoose = require('mongoose');

//mongoose schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  priceDiscount: Number,
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
});

//mongoose model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
