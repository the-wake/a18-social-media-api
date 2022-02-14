const { User } = require('../models');

async function getUsers(req, res) {
  try {
    const users = await User.find();
    !users
    ? res.status(404).json({ message: 'No users found in database' })
    : console.table(users)
    res.status(200).json(users);
  }

  catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getUsers
}



// async getUsers(req, res) {
//   try {
//     const users = await User.find({});
//     console.table(users);
//     res.status(200).json(users);
//   }
  
//   catch (err) {
//     res.status(500).json(err);
//   }
// },


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
