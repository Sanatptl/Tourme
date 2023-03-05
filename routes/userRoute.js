const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

//

const router = express.Router();

router.post('/signup', authController.signUp); // kind of special route that does't need to fit into REST philosophy
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.route('/').get(userController.getUsers).post(userController.createUser);
router.route('/:ID').get(userController.getUser);

module.exports = router;
