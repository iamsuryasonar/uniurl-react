const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
module.exports = mongoose.model('Link', linkSchema)
