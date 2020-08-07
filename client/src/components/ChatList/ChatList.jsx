import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getLastMsgs } from '../../redux/actions'
import './styles.scss'

const ChatList = ({ id }) => {
    const dispatch = useDispatch()
    const lastMsgList = useSelector(state => state.chats.lastMsgList)
    const history = useHistory()

    useEffect(() => {
        dispatch(getLastMsgs())
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
                        {lastMsgList.map((item , index) => (
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
