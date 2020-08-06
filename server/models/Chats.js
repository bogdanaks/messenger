const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatsSchema = new Schema({
    chatId: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = Chat = mongoose.model('chats', ChatsSchema)