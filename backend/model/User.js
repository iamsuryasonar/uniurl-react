const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 255,
    index: true,
  },
  usernameUpdated: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 6,
    maxlength: 255,
    index: true,
  },
  googleId: {
    type: String,
    required: false,
    select: false
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 500,
    select: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  picture: {
    url: {
      type: String,
    },
    fileName: {
      type: String,
    }
  },
  theme: {
    type: String,
    default: 'Lawrencium',
  },
});

module.exports = mongoose.model("User", userSchema);