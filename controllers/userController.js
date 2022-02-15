const { User } = require('../models');

async function getUsers(req, res) {
  try {
    const usersData = await User.find();
    !usersData
    ? res.status(404).json('No users found in database.')
    : console.log(usersData)
    res.status(200).json(usersData);
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function getUser(req, res) {
  try {
    const userData = await User.findOne({ _id: req.params.userId })
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
    console.log(userData);
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
}


module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
}


//   getComments(req, res) {
//     Comment.find()
//       .then((comment) => res.json(comment))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Get a single comment
//   getSingleComment(req, res) {
//     Comment.findOne({ _id: req.params.commentId })
//       .then((comment) =>
//         !comment
//           ? res.status(404).json({ message: 'No comment found with that id' })
//           : res.json(comment)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Create a comment
//   createComment(req, res) {
//     Comment.create(req.body)
//       .then((comment) => {
//         return Post.findOneAndUpdate(
//           { _id: req.body.postId },
//           { $push: { comments: comment._id } },
//           { new: true }
//         );
//       })
//       .then((post) =>
//         !post
//           ? res
//               .status(404)
//               .json({ message: 'comment created, but no posts with this ID' })
//           : res.json({ message: 'comment created' })
//       )
//       .catch((err) => {
//         console.error(err);
//       });
//   },
// };
