const { Thought } = require('../models');

async function getThoughts(req, res) {
  try {
    const thoughtData = await Thought.find();
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
    const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
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
    console.log(newThought);
    res.status(200).json(`Thought posted: "${newThought.thoughtText}".`);
  }

  catch (err) {
    res.status(500).json(err);
  }
};


module.exports = {
  getThoughts,
  getThought,
  addThought,
}