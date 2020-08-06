import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../axios'

import "./styles.scss"

const Main = () => {
    const history = useHistory()
    useEffect(() => {
        if(!localStorage.getItem('auth')) history.push('/login')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleCreateChat = async (e) => {
        e.preventDefault()
        const chatObj = {
            chatId: Date.now(),
            userId: localStorage.getItem('auth')
        }
        await api.post('/api/chat/create', chatObj)
            .then(res => {
                history.push('/chats/' + res.data.chatId)
            })
            .catch(err => alert(err) )
    }
    return (
        <div className="container d-flex flex-column">
            <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
                <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                    <h1>Create new chat</h1>
                    <form className="mb-3">
                        <button className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold" onClick={handleCreateChat}>CREATE</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Main
