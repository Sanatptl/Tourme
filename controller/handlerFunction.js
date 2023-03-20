const catchAsyncFn = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIfeatures = require('./../utils/apiFeatures');

//

exports.createOne = (Model) =>
  catchAsyncFn(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

//

exports.deleteOne = (Model) =>
  catchAsyncFn(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.ID);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
    });
  });

//

exports.getOne = (Model, populateOpt) =>
  catchAsyncFn(async (req, res, next) => {
    let query = Model.findById(req.params.ID);
    if (populateOpt) query = query.populate(populateOpt);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

//

exports.updateOne = (Model) =>
  catchAsyncFn(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.ID, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

//

exports.getAll = (Model) =>
  catchAsyncFn(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filterObj = {};
    if (req.params.tourId) filterObj = { tour: req.params.tourId };

    const api = new APIfeatures(Model.find(filterObj), req.query);
    api.filter().sort().page().fields();
    // const doc = await api.query.explain();
    const doc = await api.query; // put 'await' here bcz we are not able to use sort, limit like methods directaly on promise if it is fullfilled

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
