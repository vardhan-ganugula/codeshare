const mongoose = require('mongoose')

const textSchema = mongoose.Schema({
    textCode : {
        type : String,
        required : true,
        unique : true
    },
    textInfo : {
        type : String,
        required: true
    },
    textName : {
        type: String, 
        required: true
    },
    shouldUpdate: {
        type: Boolean,
        default: true
    },
    expiryDate: {
        type: Date,
        required: true
    }
}, {timestamps : true});

textSchema.index({expiryDate: 1}, {expireAfterSeconds: 0}) // this will delete the document after the expiry date

const textModel = mongoose.model('textCode', textSchema)

module.exports = textModel