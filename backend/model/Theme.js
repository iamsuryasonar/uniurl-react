const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    pagecontainer: {
        type: Object,
    },
    avatarnameciocontainer: {
        type: Object,
    },
    avatarimagecontainer: {
        type: Object,
    },
    namebiocontainer: {
        type: Object,
    },
    urlcardcontainer: {
        type: Object,
    },
});

module.exports = mongoose.model("Theme", themeSchema);