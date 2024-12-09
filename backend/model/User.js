const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  googleId: {
    type: String,
    required: false,
    unique: true
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 500,
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
  theme: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme' },
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
});

module.exports = mongoose.model("User", userSchema);