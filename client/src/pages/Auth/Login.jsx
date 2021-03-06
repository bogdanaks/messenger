import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { loginUser } from '../../redux/actions'
import './styles.scss'

const Auth = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('auth')) {
            history.push('/chats')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleBtnClick = async (e) => {
        e.preventDefault()     
        loginUser(name, password, history)       
    }
    return (
        <div className="container d-flex flex-column">
            <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
                <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                    <h2>Login in messenger</h2>
                    <form className="mb-3">
                        <div className="form-group">
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input type="text" className="form-control form-control-md" id="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input type="password" className="form-control form-control-md" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="row alreadyAuth">
                            <div className="col-12">
                                <Link to="/register">Not registered yet? Click to register</Link>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold" onClick={handleBtnClick}>LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth
