import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';
import AppBar from 'material-ui/AppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class Header extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <div className="header">
          <img src={logo} className="header-logo" alt="logo" />
          <h2>Welcome to page-turner</h2>
        </div>
      </div>
    );
  }
}

const MainAppBar = () => {
  return (
    <AppBar
      iconElementLeft={<InnerAppBar />}
      title="page-turner.io"
      style={{backgroundColor: '#0D47A1'}}
      />
)};

const InnerAppBar = () => (
  <div>
    <img src={logo} className="header-logo" alt="logo" />
  </div>
)



export default MainAppBar;
