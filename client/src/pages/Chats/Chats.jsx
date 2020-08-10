import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { getChatsUser, getMessages, getChat } from '../../redux/actions'
import './styles.scss'
// import store from '../../redux/store'

import ChatHeader from '../../components/ChatHeader/ChatHeader'
import ChatList from '../../components/ChatList/ChatList'
import ChatMessages from '../../components/ChatMessages/ChatMessages'
import ChatInput from '../../components/ChatInput/ChatInput'



const Chats = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const messages = useSelector(state => state.chats.messages)
    useEffect(() => {
        if(!localStorage.getItem('auth')) {
            history.push('/login')
        } else {
            dispatch(getChatsUser(JSON.parse(localStorage.getItem('auth')).userId))
            if(id) {
                const res = getChat(id, JSON.parse(localStorage.getItem('auth')).userId)
                res
                    .then(res => {
                        if(res === 'ok') {
                            dispatch(getMessages(id))
                        } else if(res === 'invite'){
                            history.push('/invite/'+id)
                        } else if(res === '404'){
                            history.push('/404')
                        }
                    })
                    .catch(err=> console.log(err))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
                            {messages.length ? 
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
