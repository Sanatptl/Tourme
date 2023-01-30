const mongoose = require('mongoose');

//mongoose schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
  rating: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

//mongoose model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
