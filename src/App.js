import React, { Component } from 'react'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './components/Header'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppBody from './AppBody'

let middleware = [ thunkMiddleware ]
if (process.env.NODE_ENV !== 'production') {
  console.log(`Env:${process.env.NODE_ENV} - Enabling dev middleware`)
  const loggerMiddleware = createLogger()
  middleware = [ ...middleware, loggerMiddleware ]
}

let store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);


class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <MuiThemeProvider>
            <div className="App">
              <Header />
              <Switch>
                <Route path='/best-sellers/:id' component={AppBody} />
                <Route exact path='/' component={AppBody} />
                <Route component={AppBody}/>

              </Switch>
            </div>
          </MuiThemeProvider>
        </Provider>
      </Router>
    );
  }
}

export default App;
