import { GET_CHATS_USER, INIT_MESSAGE, SET_NEW_MESSAGE, SET_USERS_ONLINE } from "./actionTypes"

import api from '../utils/axios'
import socket from '../utils/socket'

// Chats actions
export function createChat(history, chatId) {
    return async dispatch => {
        try {
            const chatObj = {
                chatId,
                userId: JSON.parse(localStorage.getItem('auth')).userId
            }
            await api.post('/api/chat/create', chatObj)
                .then(res => {
                    history.push('/chats/'+res.data.chatId)
                    dispatch(getChatsUser(chatObj.userId))
                    dispatch(getMessages(res.data.chatId))
                })
                .catch(err => alert(err) )
        } catch (error) {
            alert(error)
        }
    }
}
export async function getChat(chatId, userId) {
    try {
        const response = await api.get(`/api/chat/getChat/${chatId}`)
           .then(async res => {
                const isChat = await api.get(`/api/user/getChats/${userId}`)
                .then( res => {
                    if(res.data.chats.length) {
                        const isCheck = res.data.chats.filter((el) => Number(el.chatId) === Number(chatId))
                        if(isCheck.length > 0) {
                            return 'ok'
                        } else {
                            return 'invite'
                        }
                    } else {
                        return 'invite'
                    }
                })
                .catch(err => {
                    return '404'
                })
                return isChat
           })
           .catch(err => {
                return '404'
           })
           return response
    } catch(err) {
        alert(err)
    }
}
export function getChatsUser(userId) {
    return async dispatch => {
        try {
            await api.get(`/api/user/getChats/${userId}`)
                .then( res => {
                    res.data.chats.forEach(chat => {
                        res.data.lastMsgs.forEach(msg => {
                            if(chat.chatId === msg.chatId) {
                                chat.lastMsg = msg
                            }
                        })
                    })
                    dispatch({ type: GET_CHATS_USER, payload: res.data.chats })
                })
                .catch(err => alert(err.response.request.response))
        } catch(err) {
            alert(err)
        }
    }
}
export async function enterChat(chatId, userId, history) {
    try {
        await api.post('/api/chat/enterchat', { userId, chatId })
                .then( res => {
                    if(res.statusText === 'OK') history.push('/chats/'+chatId)
                })
                .catch(err => alert(err))
    } catch(err) {
        console.log(err)
    }
}

// Messages actions
export function getMessages(chatId) {
    return async dispatch => {
        try {
            await api.get(`/api/message/getMsgById/${chatId}`)
            .then(res => {
                dispatch({ type: INIT_MESSAGE, payload: res.data })
            })
            .catch(err => alert(err.response.request.response))
        } catch (err) {
            alert(err)
        }
    }
}
export function sendMessage(text, chatId, userId) {
    return async dispatch => {
        const msgObj = {
            chatId,
            userId,
            userName: JSON.parse(localStorage.getItem('auth')).name,
            text,
            date: Date.now()
        }
        try {
            await api.post('/api/message/sendMessage', msgObj)
            .then(res => {
                dispatch(setMessageStore(msgObj))
                socket.sendMessage(res.data)
            })
        } catch (error) {
            alert(error)
        }
    }
}
export function setMessageStore(msg) {
    return {
        type: SET_NEW_MESSAGE,
        payload: msg
    }
}

// Users actions
export async function registerUser(name, password, history) {
    try {
        const userObj = {
            userId: Date.now(),
            name,
            password
        }
        await api.post('/api/user/register', userObj)
            .then(res => {
                localStorage.setItem('auth', JSON.stringify({userId: res.data.userId, name: res.data.name}))
                history.push('/chats')
            })
            .catch(err => alert(err.response.request.response))
    } catch(err) {
        console.log(err)
    }
}
export async function loginUser(name, password, history) {
    try {
        const userObj = {
            name,
            password
        }
        await api.post('/api/user/login', userObj)
            .then(res => {
                localStorage.setItem('auth', JSON.stringify({userId: res.data.userId, name: res.data.name}))
                history.push('/chats')
            })
            .catch(err => alert(err.response.request.response))    
    } catch(err) {
        console.log(err)
    }
}
export function setOnlineUsers(users) {
    return {
        type: SET_USERS_ONLINE,
        payload: users
    }
}