const { Schema, model, Query } = require('mongoose');
const Thought = require('./Thought.js');

const userSchema = new Schema({
  name: { type: String, trimmed: true, unique: true, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^([\w\.-]+)@([\w\.-]+)\.([a-zA-Z0-9\.]{2,6})$/, 'Please enter a valid email address.']
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount').get(function() {
  return this.friends?.length;
});

// userSchema.pre('findOneAndDelete', function(next) {
//   Thought.deleteMany({ userId: this._id }).exec();
//   next();
// });

const User = model('User', userSchema);

module.exports = User;
