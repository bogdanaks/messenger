import React from 'react'
import './styles.scss'

import ChatList from '../../components/ChatList/ChatList'
import ChatMessages from '../../components/ChatMessages/ChatMessages'

const Chats = () => {
    return (
        <div className="wrapperChats">
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-3">
                        <ChatList />
                    </div>
                    <div className="col-9">
                        <ChatMessages />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats
