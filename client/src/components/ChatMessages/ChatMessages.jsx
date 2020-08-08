import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setLastMessageStore, setMessageStore, initMessages } from '../../redux/actions'
import socket from '../../utils/socket'
import './styles.scss'

const ChatMessages = ({ id }) => {
    const [socketMsg, setSocketMsg] = useState()
    const dispatch = useDispatch()
    const messages = useSelector(state => state.chats.messages)
    useEffect(() => {
        dispatch(initMessages(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        socket.getMessage(setSocketMsg)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if(socketMsg) {
            if(socketMsg.chatId === id) dispatch(setMessageStore(socketMsg))
            dispatch(setLastMessageStore(socketMsg))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketMsg])
    return (
        <div className="wrapperChatMessages">
            <div className="container-fluid messagesBlock">
                <ul>
                    {messages.map((item, indx) => (
                        <li key={indx}>
                            <div className={item.userId === JSON.parse(localStorage.getItem('auth')).userId 
                                            ? "row messagesBlock__message messageSelf"
                                            : "row messagesBlock__message"
                                            }>
                                <div className="row">
                                    <div className="col-8"><div className="col-12 messagesBlock__message__user">{item.userName}</div></div>
                                    <div className="col-4"><div className="messageTime">10:20 pm</div></div>
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
