import React from 'react'
import IconButton from 'material-ui/IconButton'
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more'
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less'
import CategoryMenuItem from './CategoryMenuItem'
import './CategoryMenu.css'

const styles = {
  iconDiv:{
    height:'auto',
    width:'auto',
    padding:0,
  },
  icon:{
    height:20,
    width:20
  },
}

class CategoryMenu extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expanded: false,
    }
  }

  handleCategoryGroupClick = () => {
    this.props.handleExpanding(this.props.menuCode)
  }

  render(){
    return(
      <div className='category-menu'>
        <div className='menu-div' onClick={this.handleCategoryGroupClick}>
          <div className='menu-name'>
            {this.props.menuName}
          </div>
          <IconButton style={styles.iconDiv} iconStyle={styles.icon}>
            {this.props.expanded ? <CloseIcon /> : <OpenIcon />}
          </IconButton>
        </div>
        <div className={this.props.expanded ? 'menu-open' : 'menu-closed'}>
          {this.props.categories.map(function(cat){
              return (<CategoryMenuItem
              key={cat.id}
              category={cat}
              selectedCategoryId={this.props.selectedCategoryId}
              handleCategoryChange={this.props.handleCategoryChange}/>)
          }.bind(this))}
        </div>
      </div>
    )
  }
}

export default CategoryMenu
