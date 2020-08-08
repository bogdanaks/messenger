import React from 'react'
import { useParams } from 'react-router-dom'

const Invite = () => {
    const { chatId } = useParams()
    return (
        <div className="container d-flex flex-column">
            <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
                <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                    <h1>Enter in chat {chatId}</h1>
                    <form className="mb-3">
                        <button className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold">ENTER</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Invite
