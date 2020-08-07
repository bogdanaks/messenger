const socketMiddleware = (socket) => {

    socket.on('CHAT:JOIN', data => {
        socket.join(data.chatId);
    })

    socket.on('CHAT:LEAVE', data => {
        socket.leave(data.room)
    })

    socket.on('sendMessage', data => {
        console.log(data)
        socket.broadcast
        .to(data.chatId)
        .emit('getMessage', data)
    })
}

module.exports = socketMiddleware