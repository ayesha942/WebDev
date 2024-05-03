const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name'],
  },
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
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;

  // Hash the password only if it's modified or new
  if (!user.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.statics.findByUsername = async function (username) {
  try {
    const user = await this.findOne({ username });
    return user;
  } catch (error) {
    throw error;
  }
};

const UserRegister = mongoose.model('userregisters', userSchema);

module.exports = UserRegister;
