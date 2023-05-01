const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');

const router = express.Router({ mergeParams: true }); //by default exprss router has access to only their specific parameters
//now it has access to tourId from tourRoute

router.use(authController.protect);

router
  .route('/')
  .post(
    authController.authAdmin('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  )
  .get(reviewController.getReviews);

router
  .route('/:ID')
  .get(reviewController.getOneReview)
  .delete(
    authController.authAdmin('user', 'admin'),
    reviewController.deleteReview
  )
  .patch(
    authController.authAdmin('user', 'admin'),
    reviewController.updateReview
  );

module.exports = router;
