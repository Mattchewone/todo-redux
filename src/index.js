import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import { install } from 'redux-loop'
import todoApp from './reducers'
import App from './components/App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(
  install()
)

const store = createStore(todoApp, {}, enhancer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)