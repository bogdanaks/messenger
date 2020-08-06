import React from 'react'
import { useParams } from 'react-router-dom'
import './styles.scss'

import ChatHeader from '../../components/ChatHeader/ChatHeader'
import ChatList from '../../components/ChatList/ChatList'
import ChatMessages from '../../components/ChatMessages/ChatMessages'
import ChatInput from '../../components/ChatInput/ChatInput'

const Chats = () => {
    const { id } = useParams()
    return (
        <div className="wrapperChats">
            <div className="container-fluid p-0">
                <ChatHeader id={id} />
                <div className="row no-gutters">
                    <div className="col-3">
                        <ChatList id={id} />
                    </div>
                    <div className="col-9">
                        <div className="container-fluid">
                            {id ? 
                                <>
                                <div className="row"><ChatMessages id={id} /></div>
                                <div className="row"><ChatInput id={id} /></div>
                                </>
                                :
                                <div className="chatNot">
                                    <h4>Chat not selected</h4>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats
