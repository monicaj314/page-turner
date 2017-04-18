import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ActionAccount from 'material-ui/svg-icons/action/account-circle';
import DropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import MenuItem from 'material-ui/MenuItem';
import CategoryDropDown from './CategoryDropDown'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SecondaryToolBar from './SecondaryToolBar'


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
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <Toolbar style={styles.mainToolBar}>
          <ToolbarGroup firstChild={true}>
            <img src={logo} className="header-logo" alt="logo" />
            <ToolbarTitle style={styles.mainToolBarTitle} text="Page Turner" />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconMenu iconButtonElement={
                <IconButton touch={true} style={styles.medium} iconStyle={styles.mediumIcon}>
                  <ActionAccount />
                </IconButton>
              }
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
            >
              <MenuItem primaryText="Sign In" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <SecondaryToolBar category="History"/>
      </div>
    )
  }
}


export default MainToolBar;
