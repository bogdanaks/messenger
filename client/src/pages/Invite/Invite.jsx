import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import api from '../../utils/axios'

const Invite = () => {
    const history = useHistory()
    const { chatId } = useParams()
    const [inChat, setInChat] = useState(false)
    useEffect( () => {
        const userId = JSON.parse(localStorage.getItem('auth')).userId
        const fetchData = async () => {      
            try {
                await api.get(`/api/user/getChats/`+userId)
                    .then( res => {
                        if(res.data.inChats.indexOf(chatId)+1) {
                            setInChat(true)
                        } else {
                            setInChat(false)
                        }
                    })
                    .catch(err => alert(err))
            } catch(err) {
                alert(err)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEnterClick = async (e) => {
        e.preventDefault()
        const userId = JSON.parse(localStorage.getItem('auth')).userId
        try {
            await api.post('/api/chat/enterchat', { userId, chatId })
                .then( res => {
                    if(res.statusText === 'OK') history.push('/chats/'+chatId)
                })
                .catch(err => alert(err))
        } catch(err) {
            alert(err)
        }
    }
    const handleOpenClick = () => {
        history.push('/chats/'+chatId)
    }
    return (
        <div className="container d-flex flex-column">
            <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
                <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                    {inChat 
                    ? 
                    <>
                        <h1>You are in chat {chatId}</h1>
                        <button className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold" onClick={(e)=> handleOpenClick(e)}>OPEN</button>
                    </>
                    :
                    <>
                        <h1>Enter in chat {chatId}</h1>
                        <form className="mb-3">
                            <button className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold" onClick={(e)=> handleEnterClick(e)}>ENTER</button>
                        </form>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Invite
