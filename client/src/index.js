import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './redux/rootReducer';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app, document.getElementById('root'))