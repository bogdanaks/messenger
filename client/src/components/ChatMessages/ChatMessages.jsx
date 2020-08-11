import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setMessageStore, setOnlineUsers } from '../../redux/actions'
import socket from '../../utils/socket'
import './styles.scss'

const ChatMessages = () => {
    const [socketMsg, setSocketMsg] = useState()
    const messages = useSelector(state => state.chats.messages)
    const dispatch = useDispatch()
    const chatRef = useRef()

    const { id } = useParams()

    useEffect(() => {
        // socket.joinChat(id, JSON.parse(localStorage.getItem('auth')).userId, JSON.parse(localStorage.getItem('auth')).name)
        socket.setOnlineUsers(dispatch, setOnlineUsers)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        socket.getMessage(setSocketMsg)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(socketMsg) {
            dispatch(setMessageStore(socketMsg, id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketMsg])
    useEffect(() => {
        chatRef.current.scrollTop = 99999999
    }, [messages])
    return (
        <div className="wrapperChatMessages">
            <div className="container-fluid messagesBlock">
                <ul ref={chatRef}>
                    {messages.map((item, indx) => (
                        <li key={indx}>
                            <div className={item.userId === JSON.parse(localStorage.getItem('auth')).userId 
                                            ? "row messagesBlock__message messageSelf"
                                            : "row messagesBlock__message"
                                            }>
                                <div className="row">
                                    <div className="col-8"><div className="col-12 messagesBlock__message__user">{item.userName}</div></div>
                                    <div className="col-4"><div className="messageTime">{new Date(item.date).getHours()}:{new Date(item.date).getMinutes()}:{new Date(item.date).getSeconds()}</div></div>
                                </div>
                                <div className="col-12 messagesBlock__message__text">{item.text}</div>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}

export default ChatMessages
