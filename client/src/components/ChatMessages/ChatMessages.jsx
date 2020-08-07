import React, { useEffect, useState } from 'react'
import api from '../../axios'
import './styles.scss'

const ChatMessages = ({ id }) => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        api.get(`/api/message/getMsgById/${id}`)
        .then(res => {
            setMessages(res.data)
        })
        .catch(err => alert(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="wrapperChatMessages">
            <div className="container-fluid messagesBlock">
                <ul>
                    {messages.map((item, indx) => (
                        <li key={item._id}>
                            <div className="row messagesBlock__message messageSelf">
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
