const { Thought, User } = require('../models');

async function getThoughts(req, res) {
  try {
    const thoughtData = await Thought.find()
    .populate('userId', 'name');
    !thoughtData
      ? res.status(404).json('No thoughts found in database.')
      : console.log(thoughtData)
    res.status(200).json(thoughtData);
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function getThought(req, res) {
  try {
    const thoughtData = await Thought.findById(req.params.thoughtId)
    .populate('userId', 'name');

    !thoughtData
      ? res.status(404).json('No thought with that ID found.')
      : res.status(200).json(thoughtData);
  }

  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

async function addThought(req, res) {
  try {
    const newThought = await Thought.create(req.body)
    const userData = await User.findByIdAndUpdate(newThought.userId,
      { $addToSet: { thoughts: newThought._id } }
    )

    !userData
      ? res.status(404).json('No user with that ID found.')
      : res.status(200).json(`Thought posted: ${newThought.thoughtText}`),
      console.log(newThought);
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function updateThought(req, res) {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body)
    
    !thoughtData
    ? res.status(404).json('No thought with that ID found.')
    : res.status(200).json(`Thought updated: ${req.body.thoughtText}`),
    console.log(thoughtData);
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function deleteThought(req, res) {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId)
    
    !deletedThought
    ? res.status(404).json('No thought with that ID found.')
    : res.status(200).json(`Deleted thought ${req.params.thoughtId}`),
    console.log(deletedThought);
  }

  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}


module.exports = {
  getThoughts,
  getThought,
  addThought,
  updateThought,
  deleteThought,
}
