'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create a mongoose model
const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Pre-hook that listens for a 'save'
usersSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// The method only runs on the model itself, but NOT the object instance.
// Like: Users.authenticateBasic NOT new User().authenticateBasic 
usersSchema.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ username });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) { return user; }
  throw new Error('Invalid User');
};

module.exports = mongoose.model('users', usersSchema);