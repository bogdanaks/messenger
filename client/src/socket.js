import io from 'socket.io-client'

let socket = io('http://localhost:5000')

const leaveChat = (chatId) => {
    socket.emit('CHAT:LEAVE', {
        chatId
    })
}

const joinChat = (chatId) => {
    socket.emit('CHAT:JOIN', {
        chatId
    })
}

const getMessage = (state) => {
    socket.on('getMessage', (payload) => {
        state(payload)
    })
}

const sendMessage = (text, chatId, userId) => {
    socket.emit('sendMessage', {
        text,
        chatId,
        userId
    })
}


export default { leaveChat, joinChat, getMessage, sendMessage }