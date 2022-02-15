const router = require('express').Router();
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(addUser);

// /api/users/:userId
router.route('/:userId').get(getUser).post(updateUser);

module.exports = router;
