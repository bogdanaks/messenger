import io from 'socket.io-client'

let socket = io()

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

const sendMessage = (msg) => {
    socket.emit('sendMessage', msg)
}


export default { leaveChat, joinChat, getMessage, sendMessage }