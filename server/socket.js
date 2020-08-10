// Import Chat Model
const Chats = require('./models/Chats')
// Import User Model
const Users = require('./models/Users')
// Import Message Model

const socketMiddleware = (socket, allClients) => {

    socket.on('CHAT:JOIN', data => {
        socket.join(data.chatId)
        let user = {
            sId: socket.id,
            userId: data.userId,
            chatId: data.chatId,
            userName: data.userName
        }
        allClients.push(user)
        let array = allClients.filter((user) => user.chatId === data.chatId)
        socket.to(data.chatId).emit('CHAT:SET_ONLINE', array)
        socket.emit('CHAT:SET_ONLINE', array)
    })

    socket.on('CHAT:GET_ONLINE', data => {
        let array = allClients.filter((user) => user.chatId === data.chatId)
        socket.emit('CHAT:SET_ONLINE', array)
    })

    socket.on('CHAT:SEND_MESSAGE', data => {
        socket.to(data.chatId).emit('CHAT:GET_MESSAGE', data)
    })
}

module.exports = socketMiddleware