const router = require('express').Router();
const {
  getUsers,
  getUser,
  addUser,
} = require('../../controllers/userController');

// /api/comments
router.route('/').get(getUsers).post(addUser);

// /api/comments/:commentId
router.route('/:userId').get(getUser);

module.exports = router;
