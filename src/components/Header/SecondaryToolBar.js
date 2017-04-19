import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import CategoryDropDown from './CategoryDropDown'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

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
      openMenu: false,
      value:1
    }
  }

  handleChange = (event, value) => {
    console.log('Change!@!1!!!', value)
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    });
    //this.props.onUpdateCategory(this.state.category)
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
          value={this.state.value}
          desktop={true}
          onChange={this.handleChange}
          iconButtonElement={<IconButton style={{width:0, padding:0, height:35}}></IconButton>}
          open={this.state.openMenu}
          onRequestChange={this.handleOnRequestChange}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          >
          <Subheader>The New York Times</Subheader>
          <MenuItem value={1} primaryText="Combined Print and E-Book Fiction" />
          <MenuItem value={2} primaryText="Combined Print and E-Book Nonfiction" />
          <MenuItem value={3} primaryText="Hardcover Fiction" />
          <MenuItem value={4} primaryText="Hardcover Nonfiction" />
          <Divider />
          <Subheader>Amazon</Subheader>
        </IconMenu>
        <CategoryDropDown category={this.props.category} onClick={this.handleOpenMenu} />
      </ToolbarGroup>
    </Toolbar>
    )
  }
}

export default SecondaryToolBar
