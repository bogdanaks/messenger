import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { getChat, enterChat } from '../../redux/actions2'

const Invite = () => {
    const history = useHistory()
    const { chatId } = useParams()
    const [inChat, setInChat] = useState(false)
    useEffect( () => {
        const fetchData = async () => {
            try {
                const res = getChat(chatId, JSON.parse(localStorage.getItem('auth')).userId)
                res.then((res) => {
                    if(res === '404') {
                        history.push('/404')
                    } else if(res === 'ok'){
                        setInChat(true)
                    }
                })
                .catch(err => console.log(err)) 
            } catch (error) {
                
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleEnterClick = async (e) => {
        e.preventDefault()
        const userId = JSON.parse(localStorage.getItem('auth')).userId
        enterChat(chatId, userId, history)
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
