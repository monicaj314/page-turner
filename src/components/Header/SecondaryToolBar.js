import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import DropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import CategoryDropDown from './CategoryDropDown'

const styles = {
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
  },
  button:{
    border:'1px solid #dcdcdc',
    borderRadius: '2px',
    backgroundColor: '#f5f5f5'
  },
  icon:{
    marginRight:3,
  }
};

class SecondaryToolBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      openMenu: false
    }
  }

  handleOnRequestChange = (value) => {
    console.log('requestchange',value)
    this.setState({
      openMenu: value,
    });
  }

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    });
  }

  render(){
    return (
    <Toolbar style={styles.secondaryToolBar}>
      <ToolbarGroup>
        <ToolbarTitle style={styles.secondaryToolBarTitle} text="Best Sellers" />
      </ToolbarGroup>
      <ToolbarGroup>
        <IconMenu
          iconButtonElement={<IconButton style={{width:0, padding:0, height:35}}></IconButton>}
          open={this.state.openMenu}
          onRequestChange={this.handleOnRequestChange}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          >
          <MenuItem value="1" primaryText="Windows App" />
          <MenuItem value="2" primaryText="Mac App" />
          <MenuItem value="3" primaryText="Android App" />
          <MenuItem value="4" primaryText="iOS App" />
        </IconMenu>
        <CategoryDropDown category={this.props.category} onClick={this.handleOpenMenu}/>
      </ToolbarGroup>
    </Toolbar>
    )
  }
}

export default SecondaryToolBar
