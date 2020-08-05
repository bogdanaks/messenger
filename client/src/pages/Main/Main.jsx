import React from 'react'
import "./styles.scss"
const Main = () => {
    return (
        <div className="container d-flex flex-column">
            <div className="row no-gutters text-center align-items-center justify-content-center min-vh-100">
                <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                    <h1>Create new chat</h1>
                    <form class="mb-3">
                        <div class="form-group">
                            <label for="name" class="sr-only">Name</label>
                            <input type="text" class="form-control form-control-md" id="name" placeholder="Enter your name"/>
                        </div>
                        <button class="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold" type="submit">CREATE</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Main
