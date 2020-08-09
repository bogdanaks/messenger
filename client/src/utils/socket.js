import io from 'socket.io-client'

let socket = io()

const leaveChat = (dispatch, action) => {
    socket.on('CHAT:LEAVE', (payload) => {
        dispatch(action(payload))
    })
}

const joinChat = (chatId, userId) => {
    socket.emit('CHAT:JOIN', {
        chatId,
        userId
    })
}

const getOnlineInChat = (dispatch, action) => {
    socket.on('CHAT:INIT_ONLINE', (payload) => {
        console.log(payload)
        dispatch(action(payload))
    })
}

const setOnlineInChat = (state) => {
    socket.emit('CHAT:SET_ONLINE', (payload) => {
        state(payload)
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


export default { leaveChat, joinChat, getOnlineInChat, setOnlineInChat, getMessage, sendMessage }