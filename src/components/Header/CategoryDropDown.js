import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import DropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';

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
    fontSize:'13px',
    color: '#444'
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

  getCategoryByIndex = (index) => {
    return this.props.categories.find((cat) => (cat.list_name_encoded === index))
  }

  render(){
    const label = (<span style={styles.labelText}>{this.getCategoryByIndex(this.props.selectedCategoryIndex).display_name}</span>)
    return (
      <div>
        <IconMenu
          value={this.props.selectedCategoryIndex}
          desktop={true}
          onChange={this.handleChange}
          iconButtonElement={<IconButton style={{border:'0px solid red', width:0, padding:0, height:2}}></IconButton>}
          open={this.state.openMenu}
          onRequestChange={this.handleOnRequestChange}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} >
          <Subheader>The New York Times</Subheader>
          <MenuItem style={styles.menuText} value="combined-print-and-e-book-fiction" primaryText="Combined Print and E-Book Fiction" />
          <MenuItem style={styles.menuText} value="combined-print-and-e-book-nonfiction" primaryText="Combined Print and E-Book Nonfiction" />
          <MenuItem style={styles.menuText} value="business-books" primaryText="Business Books" />
          <Divider />
          <Subheader>Amazon</Subheader>
          <MenuItem style={styles.menuText} value={5} primaryText="Amazon Nonfiction" />
          <Subheader>Goodreads</Subheader>
          <MenuItem style={styles.menuText} value={6} primaryText="Goodreads Nonfiction" />
        </IconMenu>

          <FlatButton
            onTouchTap={this.handleOpenMenu}
            style={styles.button}
            label={label}
            labelPosition="before"
            primary={false}
            icon={<DropDownIcon style={styles.icon}/>}
          />

      </div>
    )
  }
}



export default CategoryDropDown
