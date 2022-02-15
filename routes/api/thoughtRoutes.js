const router = require('express').Router();
const {
  getThoughts,
  getThought,
  addThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(addThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThought);

module.exports = router;
