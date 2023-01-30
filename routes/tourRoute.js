const tourController = require('./../controller/tourController');
const express = require('express');

const router = express.Router();

////////// params middleware///////////
/*
 * @param id -specifies the parameter we want to search for(string)
 * @param req, res obeject plus value of the parameter in question (route handller fn)
 */
router.param('ID', tourController.checkId);

//

router
  .route('/')
  .get(tourController.getTours)
  .post(tourController.checkBody, tourController.createTour);
router.route('/:ID').get(tourController.getTour);

module.exports = router;
