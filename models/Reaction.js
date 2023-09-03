const { Schema, Types } = require("mongoose");

// reaction schema 
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: function () {
        return new Types.ObjectId();
      },
    },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (time) {
        return new Date(time).toLocaleDateString();
      },
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;