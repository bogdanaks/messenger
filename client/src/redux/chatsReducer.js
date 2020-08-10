import { GET_CHATS_USER,
        SET_NEW_MESSAGE,
        INIT_MESSAGE,
        SET_USERS_ONLINE } from './actionTypes'

const initialState = {
    chatsUser: [],
    messages: []    
}

export const chatsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CHATS_USER:
            return { ...state,  chatsUser: action.payload}
        case SET_USERS_ONLINE:
            return { ...state,  usersOnline: action.payload}

        case INIT_MESSAGE:
            return { ...state, messages: [...action.payload] }
        case SET_NEW_MESSAGE:
            let newArr = state.chatsUser.map((chat) => {
                if(chat.chatId === action.payload.chatId) {
                    chat.lastMsg = action.payload
                    return chat
                }
                return chat
            })
            return { ...state, chatsUser: newArr, messages: state.messages.concat(action.payload) }
        default: return state
    }
}