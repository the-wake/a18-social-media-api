const router = require('express').Router();
const {
  getUsers,
  // getSingleComment,
  // createUser,
} = require('../../controllers/userController');

// /api/comments
router.route('/').get(getUsers)//.post(createUser);

// /api/comments/:commentId
// router.route('/:commentId').get(getSingleComment);

module.exports = router;
