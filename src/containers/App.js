import React, { Component } from 'react';
import './App.css';
import HeaderContainer from './HeaderContainer';
import BestSellersListContainer from './BestSellersListContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
            <HeaderContainer />
            <BestSellersListContainer />
        </div>
      </ MuiThemeProvider>
    );
  }
}

export default App;
