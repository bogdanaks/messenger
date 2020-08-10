const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessagesSchema = new Schema({
    chatId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }
}, { timestamps: true })

module.exports = Message = mongoose.model('messages', MessagesSchema)