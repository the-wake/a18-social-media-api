const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    min: [1, 'Please enter at least one character'],
    max: [280, 'Maximum length exceeded. ({VALUE} characters vs. maximum 280.)'],
    required: true
  },
  username: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }],
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

const Thought = mongoose.model('Thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(() => {
  return this.reactions.length;
});

module.exports = Thought;
