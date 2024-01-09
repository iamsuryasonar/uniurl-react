const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
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
  picture: {
    url: {
      type: String,
    },
    fileName: {
      type: String,
    }
  },

  links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
});

module.exports = mongoose.model("User", userSchema);