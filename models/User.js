const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, trimmed: true, unique: true, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    // validate: [validEmail, 'Please enter a valid email address.'],  // could use this with a validEmail constant instead of the match object below.
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
  console.log(this);
  return this.friends?.length;
});

const User = model('User', userSchema);

module.exports = User;
