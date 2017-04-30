import React from 'react'
import IconButton from 'material-ui/IconButton'
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more'
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less'
import CategoryMenuItem from './CategoryMenuItem'
import './LeftNav.css';

const styles = {
  menuDiv:{
    display:'flex',
    alignItems:'flex-end',
    //justifyContent:'space-between',
    cursor: 'pointer',
    //backgroundColor:'#f1f1f1'
  },
  menuName:{
    fontSize:'13px',
    fontWeight:'bold',
    padding: '0px 0px 2px 0px',
  },
  iconDiv:{
    height:'auto',
    width:'auto',
    padding:0,
  },
  icon:{
    height:20,
    width:20
  },
  categoryMenuOpen:{
    height: 'auto',
    //transition: 'max-height 200ms linear',
    overflow:'hidden',
  },
  categoryMenuClosed:{
    height:0,
    //transition: 'max-height 200ms linear',
    overflow:'hidden',
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
      <div>
        <div style={styles.menuDiv} onClick={this.handleCategoryGroupClick}>
          <div style={styles.menuName}>
            {this.props.menuName}
          </div>
          <IconButton style={styles.iconDiv} iconStyle={styles.icon}>
            {this.props.expanded ? <CloseIcon /> : <OpenIcon />}
          </IconButton>
        </div>
        <div style={this.props.expanded ? styles.categoryMenuOpen : styles.categoryMenuClosed}>
          {this.props.categories.map(function(cat){
              return (<CategoryMenuItem key={cat.id} id={cat.id} name={cat.name} handleCategoryChange={this.props.handleCategoryChange}/>)
          }.bind(this))}
        </div>
      </div>
    )
  }
}

export default CategoryMenu