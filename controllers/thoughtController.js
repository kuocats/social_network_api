const { Thought, User } = require("../models");

// get all thoughts
async function thoughtsGetAll(req, res) {
  Thought.find()
    .then(async (thoughts) => {
      const thoughtObj = {
        thoughts,
      };
      return res.json(thoughtObj);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

// get single thought
function thoughtGetSingle(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
    .select("-__v")
    .then(async (thought) =>
      !thought
        ? res.status(404).json({ message: "Sorry, no thought found" })
        : res.json({
            thought,
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}

// create new thought
function thoughtCreate(req, res) {
  Thought.create(req.body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then((thought) =>
      !thought ? res.status(404) : res.json({ message: "Thought created!" })
    )
    .catch((err) => {
      console.error(err);
    });
}

// delete thought from user
function thoughtDelete(req, res) {
  Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "Sorry, no thought found" })
        : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
    )
    .then((user) =>
      !user ? res.status(404) : res.json({ message: "Thought deleted!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

// thought update
function thoughtUpdate(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "Sorry, no thought found" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}

// create reaction
function reactionCreate(req, res) {
  console.log("Add your reaction!");
  console.log(req.body);
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reaction: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "Sorry, no thought found" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}

// remove reaction
function reactionRemove(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reaction: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "Sorry, no thought found" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
}

module.exports = {
  thoughtsGetAll,
  thoughtGetSingle,
  thoughtCreate,
  thoughtDelete,
  thoughtUpdate,
  reactionCreate,
  reactionRemove,
};