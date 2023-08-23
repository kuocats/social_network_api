const { Schema, model, Types } = require('mongoose');

const moment = require('moment')

//reaction schema
const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
    },
    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlenth: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(creattedAtVal). format("MMM DD, YYY [at hh:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJson: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

thoughtSchema.virtual(`reactionCount`)
.get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;