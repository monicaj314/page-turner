import React, { Component } from 'react';
import './App.css';
import Header from '../components/Header';
import BestSellersListContainer from '../containers/BestSellersListContainer'
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import AppBar from 'material-ui/AppBar';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
            <Header />
            <BestSellersListContainer />
        </div>
      </ MuiThemeProvider>
    );
  }
}

export default App;
