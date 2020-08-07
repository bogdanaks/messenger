import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import socket from '../../socket'
import api from '../../axios'
import './styles.scss'

const ChatList = ({ id }) => {
    const [chatsList, setChatsList] = useState([])
    const history = useHistory()
    useEffect(() => {
        api.get(`/api/user/getChats/${JSON.parse(localStorage.getItem('auth')).userId}`)
            .then( async (res) => {
                await api.get(`/api/message/getLastMsg/${res.data.inChats}`)
                    .then(res => {
                        setChatsList(res.data)
                        res.data.forEach((el) => {
                            socket.joinChat(el.chatId)
                        })
                    })
                    .catch(err => alert(err))
            })
            .catch(err => alert(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleChatClick = (chatId) => {
        history.push('/chats/'+chatId)
    }
    return (
        <div className="wrapperChatList">
            <div className="container-fluid p-0">
                <div className="row chatList__list no-gutters mh-70">
                    <ul className="chatList__content">
                        {chatsList.map((item , index) => (
                        <li 
                            className={item.chatId === id ? "chatList__list__item active" : "chatList__list__item"} 
                            key={item.chatId} 
                            onClick={() => handleChatClick(item.chatId)}
                        >
                            <div className="col-12 itemBlock p-0">
                                <div className="row">
                                    <div className="col-8">
                                        <span className="chatId">#{item.chatId}</span>
                                    </div>
                                    <div className="col-4 chatTime text-right">10:20 pm</div>
                                </div>
                                <div className="row">
                                    <div className="col-12 userName">{item.userName}</div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="userMessage">{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ChatList
