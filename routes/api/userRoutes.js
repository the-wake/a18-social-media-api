const router = require('express').Router();
const {
  getUsers,
  getUser,
  addUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(addUser);

// /api/users/:userId
router.route('/:userId').get(getUser);

module.exports = router;
