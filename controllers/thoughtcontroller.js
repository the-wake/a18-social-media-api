const { Thought, User } = require('../models');

async function getThoughts(req, res) {
  try {
    const thoughtData = await Thought.find()
      .populate('userId', 'name')
    !thoughtData
      ? res.status(404).json('No thoughts found in database.')
      : res.status(200).json(thoughtData);
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
      : res.status(200).json(`Thought posted: ${newThought.thoughtText}`)
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
      : res.status(200).json(`Thought updated: ${req.body.thoughtText}`)
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function deleteThought(req, res) {
  try {
    const removedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

    !removedThought
      ? res.status(404).json('No thought with that ID found.')
      : res.status(200).json(`Deleted thought ${req.params.thoughtId}`)
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function addReaction(req, res) {
  try {
    const newReaction = await Thought.findByIdAndUpdate(req.params.thoughtId,
      { $addToSet: { reactions: req.body } });

    !newReaction
      ? res.status(404).json('No thought with that ID found.')
      : res.status(200).json(`Added reaction: ${req.body.reactionBody}`);
  }

  catch (err) {
    res.status(500).json(err);
  }
};

async function deleteReaction(req, res) {
  try {
    const removedReaction = await Thought.findByIdAndUpdate(req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } });

    !removedReaction
      ? res.status(404).json('No thought/reaction combination with those IDs found.')
      : res.status(200).json(`Deleted reaction ${req.params.reactionId}`)
  }

  catch (err) {
    res.status(500).json(err);
  }
};


module.exports = {
  getThoughts,
  getThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
}
