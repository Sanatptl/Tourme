const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

//

const router = express.Router();

router.post('/signup', authController.signUp); // kind of special route that does't need to fit into REST philosophy
router.get('/isLoggedIn', authController.isLoggedIn);
router.post('/login', authController.login);
router.get('/logout', authController.logOut);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect); // basically protect all the routes that comes after this middleware

router.patch('/updatePassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getOneUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.authAdmin('admin'));
router.route('/').get(userController.getUsers).post(userController.createUser);

router
  .route('/:ID')
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
