const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pagecontainer: {
        type: String,
    },
    avatarnameciocontainer: {
        type: String,
    },
    avatarimagecontainer: {
        type: String,
    },
    namebiocontainer: {
        type: String,
    },
    urlcardcontainer: {
        type: String,
    },
});

module.exports = mongoose.model("Theme", themeSchema);