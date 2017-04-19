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
    backgroundColor: '#f5f5f5'
  },
  icon:{
    marginRight:3,
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
          <MenuItem value="combined-print-and-e-book-fiction" primaryText="Combined Print and E-Book Fiction" />
          <MenuItem value="combined-print-and-e-book-nonfiction" primaryText="Combined Print and E-Book Nonfiction" />
          <MenuItem value="business-books" primaryText="Business Books" />
          <Divider />
          <Subheader>Amazon</Subheader>
          <MenuItem value={5} primaryText="Amazon Nonfiction" />
          <Subheader>Goodreads</Subheader>
          <MenuItem value={6} primaryText="Goodreads Nonfiction" />
        </IconMenu>

          <FlatButton
            onTouchTap={this.handleOpenMenu}
            style={styles.button}
            label={this.getCategoryByIndex(this.props.selectedCategoryIndex).display_name}
            labelPosition="before"
            primary={false}
            icon={<DropDownIcon style={styles.icon}/>}
          />

      </div>
    )
  }
}



export default CategoryDropDown
