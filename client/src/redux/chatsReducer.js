import { GET_CHATS, GET_LAST_MSG, SET_LAST_MSG, SET_MESSAGE, INIT_MESSAGE } from './actionTypes'

const initialState = {
    chatList: [],
    lastMsgList: [],
    messages: []
}

export const chatsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CHATS:
            return { ...state, chatList: state.chatList.concat(action.payload) }
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
        default: return state
    }
}