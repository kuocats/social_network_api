const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction.js");

// thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    username: { type: String, required: true },
    reaction: [reactionSchema],
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (time) {
        return new Date(time).toLocaleDateString();
      },
    },
  },
  {
    toJSON: { getters: true, virtuals: true },
    id: false,
  }
);

// virtual reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

// thought model init
const Thought = model("thought", thoughtSchema);

module.exports = Thought;