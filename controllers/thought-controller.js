const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    // get a single thought by Id
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.id})
        .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with that id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // create a new thought
    createThought({ body }, res) {
        console.log(body)
        Thought.create(body)
            .then(({ _id })  => {
                return User.findOneAndUpdate(
                    { username: body.username},
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) { 
                    res.status(404).json({ message: 'No Thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // update a thought by Id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this Id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // delete a thought by Id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this ID!'});
                    return;
                } 
                res.json(dbThoughtData);
            })
            .catch(err => res.status(404).json(err));
    },

    // Add a reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: {reactions: body } },
            { new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this ID!'});
                return;
            } 
            res.json(dbThoughtData);
        })
        .catch(err => res.status(404).json(err));
    },

    // delete a reaction to a thought
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id:  params.id },
            { $pull: {reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;