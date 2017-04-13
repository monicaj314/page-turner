import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import App from './containers/App.js'
import rootReducer from './reducers'
import './index.css'
import { fetchBestSellers } from './actions'

const loggerMiddleware = createLogger()

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

store.dispatch(fetchBestSellers('Science')).then(() =>
  console.log(store.getState())
)

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);
