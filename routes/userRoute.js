const {
  getUser,
  getUsers,
  createUser,
} = require('./../controller/userController');
const express = require('express');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);
router.route('/:ID').get(getUser);

module.exports = router;
