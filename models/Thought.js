const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction.js')

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    min: [1, 'Please enter at least one character'],
    max: [280, 'Maximum length exceeded. ({VALUE} characters vs. maximum 280.)'],
    required: true
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // Why the hell does this work?
  reactions: [Reaction],
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions?.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
