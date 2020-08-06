const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = User = mongoose.model('users', UsersSchema)