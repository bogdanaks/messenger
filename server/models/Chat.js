const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    chatId: {
        type: String,
        required: true
    },
}, { timestamps: true })
module.exports = Room = mongoose.model('chat', ChatSchema)