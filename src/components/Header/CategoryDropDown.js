import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import DropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import './SecondaryToolBar.css'

import MenuIcon from 'material-ui/svg-icons/navigation/menu';

const styles={
  button:{
    border:'1px solid #dcdcdc',
    borderRadius: '2px',
    backgroundColor: '#f5f5f5',
    height:'27px',
    lineHeight:'27px',
  },
  icon:{
    marginRight:3,
  },
  labelText:{
    textTransform: 'none',
    fontSize:'12px',
    fontWeight:'bold',
    color: '#444'
  },
  menuText:{
    fontSize:'12px',
    color: '#444',
    lineHeight:'20px',
    minHeight:'20px',
  }
}

class CategoryDropDown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openMenu: false,
    }
  }

  handleChange = (event, value) => {
    this.props.updateCategory(this.getCategoryByIndex(value))
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

  getCategoriesBySource = (source) => {
    return this.props.categories.filter(cat => cat.listSourceId === source && cat.visible)
  }

  render(){
    return (
      <div>
        <IconMenu
          value={this.props.selectedCategoryIndex}
          desktop={true}
          onChange={this.handleChange}
          iconButtonElement={
            <div className='menu-icon-div'>
              <IconButton>
                <MenuIcon color={'#000'}/>
              </IconButton>
            </div>
          }
          open={this.state.openMenu}
          onRequestChange={this.handleOnRequestChange}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          menuStyle={{maxHeight:'600px'}}
          style={{maxHeight:'300px'}}
          listStyle={{maxHeight:'300px'}} >

          <Subheader style={{lineHeight:'32px'}}>The New York Times</Subheader>
            {this.getCategoriesBySource('NYT').map(cat => {
              return <MenuItem
                key={cat.id}
                style={styles.menuText}
                value={cat.id}
                primaryText={cat.name} />
            })}

          <Subheader style={{lineHeight:'32px'}}>Amazon</Subheader>
            {this.getCategoriesBySource('AMZ').map(cat => {
              return <MenuItem key={cat.id}
                key={cat.id}
                value={cat.id}
                style={styles.menuText}
                primaryText={cat.name} />
            })}





        </IconMenu>



          {/* <FlatButton
            onTouchTap={this.handleOpenMenu}
            style={styles.button}
            label='Best Sellers'
            labelPosition="before"
            primary={false}
            icon={<DropDownIcon style={styles.icon}/>}
          /> */}

      </div>
    )
  }
}



export default CategoryDropDown
