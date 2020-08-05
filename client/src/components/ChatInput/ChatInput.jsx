import React from 'react'
import './styles.scss'

const ChatInput = () => {
    return (
        <div className="container-fluid">
           <div className="row">
               <div className="col-12 chatInput">
                   <div className="row">
                       <div className="col">
                            <div className="inputText">
                                <textarea className="form-control transparent-bg border-0" placeholder="Write your message..."></textarea>
                            </div>
                       </div>
                       <div className="col-auto">
                            <div className="inputSend">
                                <button>SEND</button>
                            </div>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default ChatInput
