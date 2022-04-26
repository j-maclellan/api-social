const router = require('express').Router();
const { getAllThoughts, getOneThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thought-controller');

// Get all and Post at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// get one, put, delete at /api/thoughts/:id
router
    .route('/:id')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);

// post a reaction or delete a reaction to a thought at /api/thoughts/:thoughtId/reactions
router
    .route('/:id/reactions')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;