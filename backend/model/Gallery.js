const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minlength: 6
    },
    picture: {
        url: {
            type: String,
        },
        fileName: {
            type: String,
        }
    },
    order: {
        type: Number,
        index: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
});

module.exports = mongoose.model("Gallery", gallerySchema);