import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { createChat } from '../../redux/actions'
import './styles.scss'

import usersImg from '../../assets/users.png'
import exitImg from '../../assets/exit.png'

const ChatHeader = ({ id }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleExitClick = () => {
        localStorage.clear('auth')
        history.push('/login')
    }
    const handleCreateChat = (e) => {
        e.preventDefault()
        const chatId = Date.now()
        dispatch(createChat(chatId))
        history.push('/chats/'+chatId)
    }
    return (
        <div className="row chatList__header no-gutters">
            <div className="col-3 chatTitle">
                <h4>Chats</h4>
                <div className="chatTitle__createChat">
                    <span onClick={handleCreateChat}>+</span>
                </div>
                <div className="exitImg">
                    <img src={exitImg} alt="Exit" onClick={handleExitClick}/>
                </div>
            </div>
            <div className="col-9 chatInfo">
                <div className="col-8">
                    {id && <h5>#{id}</h5>}
                </div>
                <div className="col-4 usersBtns">
                    <div className="usersBtns__users">
                        {id && <img src={usersImg} alt="Users"/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
