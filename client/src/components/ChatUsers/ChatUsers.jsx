import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUsersInChats } from '../../redux/actions'
import './styles.scss'

const ChatUsers = ({ id }) => {
    const dispatch = useDispatch()
    const usersInChat = useSelector(state => state.chats.usersInChat)
    useEffect(() => {
        dispatch(getUsersInChats(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="chatUsersBlock">
            <ul>
                {usersInChat.map((item, indx) => 
                    <li key={item._id}><span>{item.name}</span><div className="online"></div></li>
                )}
            </ul>
        </div>
    )
}

export default ChatUsers