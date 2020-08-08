import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Main from './pages/Main/Main'
import Chats from './pages/Chats/Chats'
import Invite from './pages/Invite/Invite'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Main} exact/>
          <Route path="/login" component={Login} exact/>
          <Route path="/register" component={Register} exact/>
          <Route path="/chats/:id" component={Chats} />
          <Route path="/chats" component={Chats} />
          <Route path="/invite/:chatId" component={Invite} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
