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
            chatId: data.chatId
        }
        allClients.push(user)
        socket.to(data.chatId).emit('CHAT:INIT_ONLINE', allClients)
        socket.emit('CHAT:INIT_ONLINE', allClients)
    })

    socket.on('CHAT:GET_ONLINE', data => {
        socket.to(data.chatId).emit('CHAT:GET_ONLINE_RES', allClients)
    })

    socket.on('sendMessage', data => {
        socket.to(data.chatId).emit('getMessage', data)
    })
}

module.exports = socketMiddleware