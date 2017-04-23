import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './containers/App.js'
import rootReducer from './reducers'
import './index.css'
import { fetchAndMergeBestSellers } from './actions'
import { fetchAmazonBookInfo } from './utilities/AmazonApi';

const loggerMiddleware = createLogger()

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);
//fetchAmazonBookInfo()

store.dispatch(fetchAndMergeBestSellers('Science'))

ReactDOM.render(
<Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <App />
  </MuiThemeProvider>
</Provider>,
  document.getElementById('root')
);
