const mongoose = require('mongoose');
const { toString } = require('qrcode');

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: 'No description provided'
    },
    groupCode: {
        type: String,
        required: true,
        unique: true
    },
    textCodes : {
        type: Array,
        required: true
    }

}, {timestamps: true});


const groupModel = mongoose.model('group', groupSchema)

module.exports = groupModel