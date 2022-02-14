const { Schema, model } = require('mongoose');

// Could store the regex as a variable, or put it in a helper, depending on how we want to use it.
// Also may want to add a unique validator since the unique field value isn't a validation. A few options at:
// https://www.npmjs.com/package/mongoose-unique-validator

// Alternatively, we may be able to do that with an await on our user constructor, using a second User.init() function to try + await User.create, which will catch the error if the address is already in use.

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
  // friends: [userSchema],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

const User = model('User', userSchema);

userSchema.virtual('friendCount').get(() => {
  return this.friends.length;
});

module.exports = User;
