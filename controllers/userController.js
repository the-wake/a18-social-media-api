const { User, Thought } = require('../models');

async function getUsers(req, res) {
  try {
    const usersData = await User.find()
    .populate('thoughts', 'thoughtText')
    .populate('friends', 'name');

    !usersData
      ? res.status(404).json('No users found in database.')
      : res.status(200).json(usersData);
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function getUser(req, res) {
  try {
    const userData = await User.findOne({ _id: req.params.userId })
    .populate('thoughts', 'thoughtText')
    .populate('friends', 'name');
    
    !userData
      ? res.status(404).json('No user with that ID found.')
      : res.status(200).json(userData);
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function addUser(req, res) {
  try {
    const userData = await User.create(req.body)
    res.status(200).json(`User created: ${userData.name} - ${userData.email}`);
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function updateUser(req, res) {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body)

    !userData
      ? res.status(404).json('No user with that ID found.')
      : res.status(200).json(`Updated user ID ${userData._id}.`);
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function deleteUser(req, res) {
  try {
    const userData = await User.findOneAndDelete({ _id: req.params.userId })
    const thoughtData = await Thought.deleteMany({ userId: req.params.userId})

    !userData
      ? res.status(404).json('No user with that ID found.')
      : res.status(200).json(`Deleted user ID ${userData._id}.`);
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function addFriend(req, res) {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }
    )

    const friendData = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $addToSet: { friends: req.params.userId } }
    )

    !userData
      ? res.status(404).json('Giver of affection not found.')
      : !friendData
        ? res.status(404).json('Receiver of affection not found.')
        : res.status(200).json(`Affection received!`);
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function endShip(req, res) {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    )

    const friendData = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: req.params.userId } }
    )

    !userData
      ? res.status(404).json('Rejector of affection not found.')
      : !friendData
        ? res.status(404).json('Receiver of rejection not found.')
        : res.status(200).json(`Affection rejected!`);
  }

  catch (err) {
    res.status(500).json(err);
  }
}


module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  endShip,
}
