const tourController = require('./../controller/tourController');
const express = require('express');
const catchAsyncFn = require('../utils/catchAsync');
const authController = require('./../controller/authController');
// const reviewController = require('./../controller/reviewController');
const reviewRouter = require('./reviewRoute');

const router = express.Router();

////////// params middleware///////////
/*
 * @param id -specifies the parameter we want to search for(string)
 * @param req, res obeject plus value of the parameter in question (route handller fn)
 */
// router.param('ID', tourController.checkId);

//

// let's crete nested route
// post /tours/u45983644/reviews/39485954(such type)
//
// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.authAdmin('user'),
//     reviewController.createReview
//   );

//
router.use('/:tourId/reviews', reviewRouter);
//

router
  .route('/5-Best-tour')
  .get(tourController.bestTours, tourController.getTours);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plans/:year')
  .get(
    authController.protect,
    authController.authAdmin('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getTourWithin);

router
  .route('/')
  .get(tourController.getTours)
  .post(
    authController.protect,
    authController.authAdmin('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:ID')
  .get(tourController.getOneTour)
  .patch(
    authController.protect,
    authController.authAdmin('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.authAdmin('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
