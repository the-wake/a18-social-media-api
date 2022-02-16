const router = require('express').Router();
const {
  getThoughts,
  getThought,
  addThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(addThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThought).post(updateThought).delete(deleteThought);

module.exports = router;
