import React, { Component } from 'react'
import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import HeaderContainer from './HeaderContainer'
import BestSellersListContainer from './BestSellersListContainer'
import LeftNavContainer from '../components/LeftNav'
import './App.css';
import { fetchAndMergeBestSellers, fetchCategories } from '../actions'
//import { fetchCategories } from '../actions/CategoryActionCreators'

const loggerMiddleware = createLogger()
let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

store.dispatch(fetchCategories())
store.dispatch(fetchAndMergeBestSellers('Science'))


const styles = {
  bodyWrapper:{
    display: 'flex',
  },
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div className="App">
              <HeaderContainer />
              <div style={styles.bodyWrapper}>
                <LeftNavContainer />
                <BestSellersListContainer />
              </div>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
