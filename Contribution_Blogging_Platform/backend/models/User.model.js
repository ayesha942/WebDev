const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator'); // Import isEmail from the validator library

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  email: {
    type: String,
    validate: {
      validator: isEmail,
      message: 'Invalid email address',
    },
    unique: true,
  },
  termsAndConditions: {
    type: Boolean,
    required: [true, 'Please agree to the terms and conditions'],
  },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
