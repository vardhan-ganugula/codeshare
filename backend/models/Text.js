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
    }
}, {timestamps : true});


const textModel = mongoose.model('textCode', textSchema)

module.exports = textModel