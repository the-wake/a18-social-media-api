const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    min: [1, 'Please enter at least one character'],
    max: [280, 'Maximum length exceeded. ({VALUE} characters vs. maximum 280.'],
    required: true
  },
  username: [{ type: mongoose.Schema.Types.ObjectId, ref: 'thought' }],
  createdAt: 'created_at', // I think this should work. Also, use getter to format timestamp on query.
  restrictions: [userSchema],
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

const Thought = mongoose.model('Thought', thoughtSchema);

postSchema.virtual('friendCount').get(() => {
  return this.friends.length;
});

module.exports = Thought;
