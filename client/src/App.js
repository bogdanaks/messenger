import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Main from './pages/Main/Main'
import Chats from './pages/Chats/Chats'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Main} exact/>
          <Route path="/chats" component={Chats} exact/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
