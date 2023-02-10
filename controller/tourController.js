const Tour = require('./../models/tourModel');

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
    // 1) filtering

    let queryObj = { ...req.query };
    const excludedFeilds = ['page', 'sort', 'fields', 'limit'];
    excludedFeilds.forEach((el) => delete queryObj[el]);

    // const tours = await Tour.find({ price: 1997 }); //querying with regular filter object(hard coded)
    // const tours = await Tour.find(req.query); //(dynamicaly coded)
    // const tours = await Tour.find().where('price').equals(1997); //querying with mongoose method

    // ii) advanced filtering

    // applying filter like greater than, less than..
    // {price : {$gt : 5}} normal filter-object
    // console.log(req.query); //{price: {gt : 5}} with params obj

    // console.log(req.query, queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);
    // console.log(req.query, queryObj);

    let query = Tour.find(queryObj);

    // 2) sorting

    // sort('price ratings') //method
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      // console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createAt');
    }

    // 3) Fields limits
    //sends back only selected fields to the client

    if (req.query.fields) {
      //select('price duration name')
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v'); //excluding '__v' property here, we can disable directly from the mongoose but that is not the best practice bcz mongoose actully use it internally
    }

    // 4) Pagination

    //Limit is the number of documents we want to retrieve, in more simply we want only 'limit' result per page
    //Skip is the amount of documents we want to skip before retrieving our documents
    const page = req.query.page * 1 || 1; //by default displaying page 1
    const limit = req.query.limit * 1 || 2;
    const skipp = (page - 1) * limit;

    query = query.skip(skipp).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skipp >= numTours) throw new Error('This page does not exist');
    }

    const tours = await query; // put 'await' here bcz we are not able to use sort, limit like methods directaly on promise if it is fullfilled
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
