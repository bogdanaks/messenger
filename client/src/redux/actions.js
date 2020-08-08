import { GET_CHATS, GET_LAST_MSG, SET_LAST_MSG, SET_MESSAGE, INIT_MESSAGE } from "./actionTypes"
import socket from '../utils/socket'
import api from '../utils/axios'


// Chats actions
export function createChat(chatId) {
    return async dispatch => {
        try {
            const chatObj = {
                chatId,
                userId: JSON.parse(localStorage.getItem('auth')).userId
            }
            await api.post('/api/chat/create', chatObj)
                .then(res => {
                    dispatch(getMsgByChatId(res.data.chatId))
                })
                .catch(err => alert(err) )
        } catch (error) {
            alert(error)
        }
    }
}

export function getChats() {
    return async dispatch => {
        try {
            await api.get(`/api/user/getChats/${JSON.parse(localStorage.getItem('auth')).userId}`)
                .then( res => (
                    dispatch({ type: GET_CHATS, payload: res.data.inChats })
                ))
                .catch(err => alert(err))
        } catch(err) {
            alert(err)
        }
    }
}

export function getLastMsgs() {
    return async dispatch => {
        try {
            getChatsList().then( async (data) => {
                await api.get(`/api/message/getLastMsg/${data}`)
                .then(res => {
                    dispatch({ type: GET_LAST_MSG, payload: res.data })
                    // res.data.forEach((el) => {
                        // socket.joinChat(el.chatId)
                    // })
                })
                .catch(err => alert(err))
            })

        } catch (err) {
            alert(err)
        }
    }
}

export function getMsgByChatId(chatId) {
    return async dispatch => {
        try {
            await api.get(`/api/message/getMsgById/${chatId}`)
            .then(res => {
                dispatch({ type: SET_MESSAGE, payload: res.data })
                // socket.joinChat(res.data[0].chatId)
            })
            .catch(err => alert(err))
        } catch (err) {
            alert(err)
        }
    }
}

export function initMessages(chatId) {
    return async dispatch => {
        try {
            await api.get(`/api/message/getMsgById/${chatId}`)
            .then(res => {
                dispatch({ type: INIT_MESSAGE, payload: res.data })
                // socket.joinChat(res.data[0].chatId)
            })
            .catch(err => alert(err))
        } catch (err) {
            alert(err)
        }
    }
}

export function sendMessage(text, id, userId) {
    return async dispatch => {
        const msgObj = {
            chatId: id,
            userId,
            userName: JSON.parse(localStorage.getItem('auth')).name,
            text
        }
        try {
            await api.post('/api/message/sendMessage', msgObj)
            .then(res => {
                dispatch({ type: SET_MESSAGE, payload: res.data })
                dispatch({ type: SET_LAST_MSG, payload: res.data })
                // socket.joinChat(res.data[0].chatId)
            })
        } catch (error) {
            alert(error)
        }
    }
}






const getChatsList = async () => {
    try {
        return await api.get(`/api/user/getChats/${JSON.parse(localStorage.getItem('auth')).userId}`)
            .then( res => res.data.inChats)
            .catch(err => alert(err))
    } catch(err) {
        alert(err)
    }
}