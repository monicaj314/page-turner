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
  secondaryToolBar:{
    backgroundColor: '#FFF',
    borderBottom:'1px solid rgb(224,224,224)',
    justifyContent:'flex-start'
  },
  secondaryToolBarTitle:{
    fontSize:'medium',
    fontWeight:'bold',
    color:'#444',

    //border:'1px solid black',
    width:'150px'
  }
};

class MainToolBar extends Component {

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
        <Toolbar style={styles.secondaryToolBar}>
          <ToolbarGroup>
            <ToolbarTitle style={styles.secondaryToolBarTitle} text="Best Sellers" />
          </ToolbarGroup>
          <ToolbarGroup>

            <IconMenu value={1}
              onChange={this.handleChange}
              iconButtonElement={<CategoryDropDown category="Science"/>}>
              <MenuItem value={1} primaryText="Never" />
              <MenuItem value={2} primaryText="Every Night" />
              <MenuItem value={3} primaryText="Weeknights" />
              <MenuItem value={4} primaryText="Weekends" />
              <MenuItem value={5} primaryText="Weekly" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}


export default MainToolBar;
