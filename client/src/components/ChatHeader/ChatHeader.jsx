import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { createChat, getMessages } from '../../redux/actions2'
import './styles.scss'

import usersImg from '../../assets/users.png'
import exitImg from '../../assets/exit.png'

import ChatUsers from '../ChatUsers/ChatUsers'

const ChatHeader = ({ id }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isChatUsers, setIsChatUsers] = useState(false)
    const messages = useSelector(state => state.chats.messages)
    const handleExitClick = () => {
        localStorage.clear('auth')
        history.push('/login')
    }
    const handleCreateChat = (e) => {
        e.preventDefault()
        const chatId = Date.now()
        dispatch(createChat(history, chatId))
    }
    const handleChatsClick = () => {
        dispatch(getMessages(0))
    }
    return (        
        <div className="row chatList__header no-gutters">
            {isChatUsers && <ChatUsers id={id}/>}
            <div className="col-3 chatTitle">
                <Link to='/chats/' className="chatsLink" onClick={handleChatsClick}>Chats</Link>
                <div className="chatTitle__createChat">
                    <span onClick={handleCreateChat}>+</span>
                </div>
                <div className="exitImg">
                    <img src={exitImg} alt="Exit" onClick={handleExitClick}/>
                </div>
            </div>
            <div className="col-9 chatInfo">
                <div className="col-8">
                    {messages.length ? <h5>#{id}</h5> : <></>}
                </div>
                <div className="col-4 usersBtns">
                    <div className="usersBtns__users">
                        {messages.length ? <img src={usersImg} alt="Users" onClick={() => setIsChatUsers(!isChatUsers)}/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
