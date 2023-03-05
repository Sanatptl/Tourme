const tourController = require('./../controller/tourController');
const express = require('express');
const catchAsyncFn = require('../utils/catchAsync');
const authController = require('./../controller/authController');

const router = express.Router();

////////// params middleware///////////
/*
 * @param id -specifies the parameter we want to search for(string)
 * @param req, res obeject plus value of the parameter in question (route handller fn)
 */
// router.param('ID', tourController.checkId);

//

router
  .route('/5-Best-tour')
  .get(tourController.bestTours, tourController.getTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plans/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, tourController.getTours)
  .post(catchAsyncFn(tourController.createTour));

router
  .route('/:ID')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.authAdmin('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
