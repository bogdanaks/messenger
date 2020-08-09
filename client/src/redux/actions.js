import { GET_USERS_IN_CHAT, GET_LAST_MSG, INIT_USERS_ONLINE, SET_USERS_ONLINE, SET_LAST_MSG, SET_MESSAGE, SET_MESSAGE_STORE, INIT_MESSAGE } from "./actionTypes"
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

export function getUsersInChats(chatId) {
    return async dispatch => {
        try {
            await api.get(`/api/chat/getUsersInChat/${chatId}`)
                .then( res => {
                    dispatch({ type: GET_USERS_IN_CHAT, payload: res.data })
                })
                .catch(err => alert(err))
        } catch(err) {
            alert(err)
        }
    }
}

export function initUsersOnline(users) {
    return {
        type: INIT_USERS_ONLINE,
        payload: users
    }
}

export function setUsersOnline(users) {
    return {
        type: SET_USERS_ONLINE,
        payload: users
    }
}

export function getLastMsgs(history, id) {
    return async dispatch => {
        try {
            getChatsList()
            .then( async (data) => {
                if(data.includes(Number(id))) {
                    await api.get(`/api/message/getLastMsg/${data}`)
                    .then(res => {
                        dispatch({ type: GET_LAST_MSG, payload: res.data })
                        res.data.forEach((el) => {
                            socket.joinChat(el.chatId, JSON.parse(localStorage.getItem('auth')).userId)
                        })
                    })
                    .catch(err => {
                        alert(err)
                    })
                } else {
                    history.push('/invite/'+id)
                }
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
            const response = await api.get(`/api/user/getChats/${JSON.parse(localStorage.getItem('auth')).userId}`)
            const inChats = response.data.inChats
            if(inChats.indexOf(Number(chatId))+1) {
                await api.get(`/api/message/getMsgById/${chatId}`)
                .then(res => {
                    dispatch({ type: INIT_MESSAGE, payload: res.data })
                })
                .catch(err => alert(err.response.request.response))
            }
        } catch (err) {
            alert(err.response.request.response)
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
                dispatch({ type: SET_MESSAGE_STORE, payload: res.data })
                dispatch({ type: SET_LAST_MSG, payload: res.data })
                socket.sendMessage(res.data)
            })
        } catch (error) {
            alert(error)
        }
    }
}
export function setMessageStore(msg) {
    return {
        type: SET_MESSAGE_STORE,
        payload: msg
    }
}
export function setLastMessageStore(msg) {
    return {
        type: SET_LAST_MSG,
        payload: msg
    }
}




const getChatsList = async () => {
    try {
        return await api.get(`/api/user/getChats/${JSON.parse(localStorage.getItem('auth')).userId}`)
            .then( res => {
                return res.data.inChats
            })
            .catch(err => alert(err))
    } catch(err) {
        alert(err)
    }
}