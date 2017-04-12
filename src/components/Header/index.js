import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';

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


export default Header;
