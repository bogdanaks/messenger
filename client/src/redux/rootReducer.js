import {combineReducers} from 'redux'
import { chatsReducer } from './chatsReducer'

export const rootReducer = combineReducers({
    chats: chatsReducer
    // app: appReducer
})