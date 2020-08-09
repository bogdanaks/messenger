import { GET_USERS_IN_CHAT, INIT_USERS_ONLINE, SET_USERS_ONLINE, GET_LAST_MSG, SET_LAST_MSG, SET_MESSAGE, SET_MESSAGE_STORE, INIT_MESSAGE } from './actionTypes'

const initialState = {
    usersOnline: [],
    usersInChat: [],
    lastMsgList: [],
    messages: []
}

export const chatsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS_IN_CHAT:
            return { ...state, usersInChat: action.payload }
        case INIT_USERS_ONLINE:
            const initonlineArr = []
            action.payload.forEach(element => {
                initonlineArr.push(element.userId)
            })
            return { ...state,  usersOnline: initonlineArr}
        case SET_USERS_ONLINE:
            const onlineArr = []
            action.payload.forEach(element => {
                onlineArr.push(element.userId)
            })
            return { ...state,  usersOnline: onlineArr}
        case GET_LAST_MSG:
            return { ...state, lastMsgList: state.lastMsgList.concat(action.payload) }
        case SET_LAST_MSG:            
            const newList = state.lastMsgList.map(obj => {
                if (obj.chatId === action.payload.chatId) {
                    return action.payload
                }
                return obj
            })
            return { ...state, lastMsgList: newList }
        case INIT_MESSAGE:
            return { ...state, messages: [...action.payload] }
        case SET_MESSAGE:
            return { ...state, messages: state.messages.concat(action.payload) }
        case SET_MESSAGE_STORE:
            return { ...state, messages: state.messages.concat(action.payload) }
        default: return state
    }
}