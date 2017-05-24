import React, { Component } from 'react'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './components/Header'
import BestSellersList from './components/BestSellersList'
import LeftNavContainer from './components/LeftNav'
import './App.css';
import { initLoad } from './actions'
import CircularProgress from 'material-ui/CircularProgress';


let middleware = [ thunkMiddleware ]
if (process.env.NODE_ENV !== 'production' && false) {
  console.log(`Env:${process.env.NODE_ENV} - Enabling dev middleware`)
  const loggerMiddleware = createLogger()
  middleware = [ ...middleware, loggerMiddleware ]
}

let store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

const styles = {
  bodyWrapper:{
    display: 'flex',
  },
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
    }
  }
  componentDidMount(){
    store.dispatch(initLoad('nyt-50'))
    .then(() => this.setState({loading:false}))
  }

  render() {
    let body = (
      <div style={{display:'flex', height:'100vh'}}>
        <div style={{margin:'auto'}}>
        <CircularProgress />
        </div>
      </div>
    )

    if (!this.state.loading) {
      body = (
        <div className="App">
          <Header />
          <div style={styles.bodyWrapper}>
            <LeftNavContainer />
            <BestSellersList />
          </div>
        </div>
        )
    }
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div>
            {body}


          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
