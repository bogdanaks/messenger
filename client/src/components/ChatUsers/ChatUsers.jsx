import React from 'react'
import { useSelector } from 'react-redux'

import './styles.scss'

const ChatUsers = ({ id }) => {
    const usersOnline = useSelector(state => state.chats.usersOnline)
    return (
        <div className="chatUsersBlock">
            <ul>
                <>
                {usersOnline.map((item, indx) => 
                    <li key={item.sId}><span>{item.userName}</span></li>
                )}
                </>
            </ul>
        </div>
    )
}

export default ChatUsers