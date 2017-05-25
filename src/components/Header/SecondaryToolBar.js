import React from 'react'
import AppBar from 'material-ui/AppBar'
import './SecondaryToolBar.css'
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';

import ToolBarNav from './ToolBarNav'


const styles = {
  appBar:{
    backgroundColor: '#FFF',
    borderBottom:'1px solid rgb(224,224,224)',
    boxShadow:'none',
    height: '40px'
  },
  icon:{
    opacity:'0'
  },
};

class SecondaryToolBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      drawerOpen: false
    }
  }

  handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen});

  handleDrawerlClose = () => this.setState({drawerOpen: false});

  handleDrawerRequestChange = (drawerOpen) => {
    this.setState({drawerOpen})
  }

  handleDrawerSelection = (categoryId) => {
    this.props.handleCategoryChange(categoryId)
    this.setState({drawerOpen: false})
  }

  render(){
    return (
      <div>
        <AppBar
          title={<span className='title-text'>Best Sellers</span>}
          titleStyle={{lineHeight:'40px'}}
          style={styles.appBar}
          iconElementLeft={
            <div className='menu-icon-div'>
              <IconButton onTouchTap={this.handleDrawerToggle} style={{padding:0, width:40, height: 40, marginTop:-8}}>
                <MenuIcon color={'#000'}/>
              </IconButton>
            </div>
            }
          className='secondary-app-bar' />

        <ToolBarNav open={this.state.drawerOpen}
          handleToggle={this.handleDrawerToggle}
          handleClose={this.handleDrawerSelection}
          handleDrawerSelection={this.handleDrawerSelection}
          handleRequestChange={this.handleDrawerRequestChange}
          categories={this.props.categories}
          selectedCategory={this.props.selectedCategory}
        />

      </div>

    )
  }
}

export default SecondaryToolBar
