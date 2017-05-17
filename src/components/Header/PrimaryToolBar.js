import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
//import IconMenu from 'material-ui/IconMenu';
//import IconButton from 'material-ui/IconButton';
//import ActionAccount from 'material-ui/svg-icons/action/account-circle';
//import MenuItem from 'material-ui/MenuItem';


const styles = {
  mediumIcon: {
    width: 45,
    height: 45,
    color: 'white',
  },
  medium: {
    padding: '0px',
  },
  mainToolBar: {
    backgroundColor: '#0D47A1',
  },
  mainToolBarTitle: {
    fontSize: 'large',
    color: 'white'
  },
};

class MainToolBar extends Component {

  render(){
    return (
        <Toolbar style={styles.mainToolBar}>
          <ToolbarGroup firstChild={true}>
            <img src={logo} className="header-logo" alt="logo" />
            <ToolbarTitle style={styles.mainToolBarTitle} text="Page Turners" />
          </ToolbarGroup>
          {/* <ToolbarGroup>
            <IconMenu iconButtonElement={
                <IconButton touch={true} style={styles.medium} iconStyle={styles.mediumIcon}>
                  <ActionAccount />
                </IconButton>
              }
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
            >
              <MenuItem primaryText="Sign In" />
            </IconMenu>
          </ToolbarGroup> */}
        </Toolbar>
    )
  }
}

export default MainToolBar;
