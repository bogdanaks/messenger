import React from 'react'

import './styles.scss'

const ChatUsers = () => {
    return (
        <div className="chatUsersBlock">
            <ul>
                <li><span>kex</span><div className="online"></div></li>
                <li><span>bogdanakswwwwwwwwwww</span><div className="offline"></div></li>
                <li><span>user3</span><div className="offline"></div></li>
                <li><span>user4</span><div className="offline"></div></li>
                <li><span>user5</span><div className="offline"></div></li>
            </ul>
        </div>
    )
}

export default ChatUsers
