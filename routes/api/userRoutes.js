const router = require('express').Router();
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  endShip,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(addUser);

// /api/users/:userId
router.route('/:userId').get(getUser).post(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(endShip);

module.exports = router;
