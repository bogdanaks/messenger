import React from 'react'
import './styles.scss'

import usersImg from '../../assets/users.png'
import userAddImg from '../../assets/userAdd.png'

const ChatHeader = () => {
    return (
        <div className="row chatList__header no-gutters">
            <div className="col-3 chatTitle">
                <h4>Chats (2)</h4>
                <span>+</span>
            </div>
            <div className="col-9 chatInfo">
                <div className="col-8"><h5>#123123123</h5></div>
                <div className="col-4 usersBtns">
                    <div className="usersBtns__users">
                        <img src={usersImg} alt="Users"/>
                    </div>
                    <div className="usersBtns__userAdd">
                        <img className="" src={userAddImg} alt="UserAdd"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
