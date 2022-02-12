const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, trimmed: true, unique: true, required: true },
  email: { type: String, unique: true, required: true },  // Add Mongoose's email matching validation.
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'thought' }],
  friends: [userSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
