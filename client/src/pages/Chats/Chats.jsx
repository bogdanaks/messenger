import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import api from '../../utils/axios'
import './styles.scss'

import ChatHeader from '../../components/ChatHeader/ChatHeader'
import ChatList from '../../components/ChatList/ChatList'
import ChatMessages from '../../components/ChatMessages/ChatMessages'
import ChatInput from '../../components/ChatInput/ChatInput'

const Chats = () => {
    const { id } = useParams()
    const history = useHistory()
    // const [usersInChat, setUsersInChat] = useState([])

    useEffect(() => {
        // window.socket = socket
        // api.get(`/api/chat/getUserNamesIn/${id}`)
        //     .then(res => {
        //         setUsersInChat(res.data)
        //     })
        //     .catch(err => alert(err))
        
        const getChat = async () => {
            try {
                await api.get(`/api/chat/getChat/`+id)
                    .then( res => res.data )
                    .catch(err => {
                        history.push('/404')
                    })
            } catch(err) {
                alert(err)
            }
        }
        if(id) {
            getChat()
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
