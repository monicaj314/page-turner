import React, { Component } from 'react';
import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderContainer from './HeaderContainer';
import BestSellersListContainer from './BestSellersListContainer'
import './App.css';


import { fetchAndMergeBestSellers, fetchAmazonTest } from '../actions'



const loggerMiddleware = createLogger()

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

fetchAmazonTest()

store.dispatch(fetchAndMergeBestSellers('Science'))


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div className="App">
              <HeaderContainer />
              <BestSellersListContainer />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
