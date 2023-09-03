const { Schema, model } = require("mongoose");

// user schema
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trimmed: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Must be valid email",
      ],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: { virtuals: true },
  }
);

// virtual friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// user model init
const User = model("user", userSchema);

module.exports = User;