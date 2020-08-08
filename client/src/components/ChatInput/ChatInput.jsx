import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { sendMessage } from '../../redux/actions'
import './styles.scss'

const ChatInput = ({ id }) => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const handleTextareaChange = (e) => {
        setMessage(e.target.value)
    }
    const handleSendClick = (e) => {
        dispatch(sendMessage(message, id, JSON.parse(localStorage.getItem('auth')).userId))
        setMessage('')
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(sendMessage(message, id, JSON.parse(localStorage.getItem('auth')).userId))
            setMessage('')
        }
    }
    return (
        <div className="container-fluid">
           <div className="row">
               <div className="col-12 chatInput">
                   <div className="row">
                       <div className="col">
                            <div className="inputText">
                                <textarea 
                                    className="form-control transparent-bg border-0" 
                                    value={message} placeholder="Write your message..." 
                                    onKeyDown={handleKeyDown} 
                                    onChange={handleTextareaChange}
                                ></textarea>
                            </div>
                       </div>
                       <div className="col-auto">
                            <div className="inputSend">
                                <button onClick={handleSendClick}>SEND</button>
                            </div>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default ChatInput
