import React, { Component } from 'react';
import logo from './logo.svg';
import './BestSellers.css';

class BestSellers extends Component {
  render() {
    return (
      <div className="best-sellers">
        <div className="best-sellers-header">
          <img src={logo} className="best-sellers-logo" alt="logo" />
          <h2>Welcome to page-turner.io</h2>
        </div>
      </div>
    );
  }
}

export default BestSellers;
