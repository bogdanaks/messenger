import io from 'socket.io-client'

let socket = io()

const leaveChat = (dispatch, action) => {
    socket.on('CHAT:LEAVE', (payload) => {
        dispatch(action(payload))
    })
}

const joinChat = (chatId, userId, userName) => {
    socket.emit('CHAT:JOIN', {
        chatId,
        userId,
        userName
    })
}

const getOnlineUsers = (id) => {
    socket.emit('CHAT:GET_ONLINE', {chatId: id})
}

const setOnlineUsers = (dispatch, action) => {
    socket.on('CHAT:SET_ONLINE', (payload) => {
        dispatch(action(payload))
    })
}

const getMessage = (state) => {
    socket.on('CHAT:GET_MESSAGE', (payload) => {
        state(payload)
    })
}

const sendMessage = (msg) => {
    socket.emit('CHAT:SEND_MESSAGE', msg)
}


export default { leaveChat, joinChat, getOnlineUsers, setOnlineUsers, getMessage, sendMessage }