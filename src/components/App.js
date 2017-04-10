import React, { Component } from 'react';
import './App.css';
import BestSellers from '../components/BestSellers';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BestSellers />
      </div>
    );
  }
}

export default App;
