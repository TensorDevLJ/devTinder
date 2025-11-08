const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a strong password");
      }
    },
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value.toLowerCase())) {
        throw new Error("Gender data not valid");
      }
    },
  },
  photoUrl: {
    type: String,
    default:
      'https://static.vecteezy.com/system/resources/previews/024/983/914/large_2x/simple-user-default-icon-free-png.png',
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Photo URL is not valid: " + value);
      }
    },
  },
  bio: {
    type: String,
    maxlength: 500,
    default: 'This is default bio for user',
  },
  Skills: {
    type: [String],
    default: [],
  },
},
{
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('User', userSchema);
