import React from 'react'
import './styles.scss'

import ChatHeader from '../../components/ChatHeader/ChatHeader'
import ChatList from '../../components/ChatList/ChatList'
import ChatMessages from '../../components/ChatMessages/ChatMessages'
import ChatInput from '../../components/ChatInput/ChatInput'

const Chats = () => {
    return (
        <div className="wrapperChats">
            <div className="container-fluid p-0">
                <ChatHeader />
                <div className="row no-gutters">
                    <div className="col-3">
                        <ChatList />
                    </div>
                    <div className="col-9">
                        <div className="container-fluid">
                            <div className="row"><ChatMessages /></div>
                            <div className="row"><ChatInput /></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats
