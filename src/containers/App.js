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
import { initLoad } from '../actions'
import CircularProgress from 'material-ui/CircularProgress';


const loggerMiddleware = createLogger()
let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
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
    store.dispatch(initLoad('nyt-0'))
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
          <HeaderContainer />
          <div style={styles.bodyWrapper}>
            <LeftNavContainer />
            <BestSellersListContainer />
          </div>
        </div>
        )
    }
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          {body}
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
