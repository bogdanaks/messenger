import { GET_CHATS, GET_LAST_MSG, GET_LAST_MSG_ONE, SET_MESSAGE, INIT_MESSAGE } from './actionTypes'

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
        case GET_LAST_MSG_ONE:
            return { ...state, lastMsgList: state.lastMsgList.concat(action.payload) }
        case INIT_MESSAGE:
            return { ...state, messages: [...action.payload] }
        case SET_MESSAGE:
            return { ...state, messages: state.messages.concat(action.payload) }
        default: return state
    }
}