const mongoose = require('mongoose')
const { URL_TYPE } = require('../constants/constant')

const linkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: 'fas fa-link',
    },
    image: {
        url: {
            type: String,
        },
        fileName: {
            type: String,
        }
    },
    color: {
        type: String,
        default: '#ffffff',
    },
    order: {
        type: Number,
        index: true,
    },
    type: {
        type: String,
        enum: [URL_TYPE.ICON_LINK, URL_TYPE.SOCIAL_LINK, URL_TYPE.AFFILIATE_LINK],
        required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }
})

module.exports = mongoose.model('Link', linkSchema)
