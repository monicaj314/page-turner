import React from 'react'
import IconButton from 'material-ui/IconButton'
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more'
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less'

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
  category:{
    fontSize:'13px',
    padding: '2px 0px 2px 10px',
  },
  categoryMenuOpen:{
  },
  categoryMenuClosed:{
    height:'0px',
    overflow:'hidden'
  },
}

class CategoryMenu extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expanded: false,
    }
  }

  handleClick = () => {
    this.props.handleExpanding(this.props.menuCode)
  }

  render(){
    return(
      <div>
        <div style={styles.menuDiv} onClick={this.handleClick}>
          <div style={styles.menuName}>
            {this.props.menuName}
          </div>
          <IconButton style={styles.iconDiv} iconStyle={styles.icon}>
            {this.props.expanded ? <CloseIcon /> : <OpenIcon />}
          </IconButton>
        </div>
        <div style={this.props.expanded ? styles.categoryMenuOpen : styles.categoryMenuClosed}>
          {this.props.categories.map((cat) => {
            return (<div key={cat.Id} style={styles.category}>
              <a href="#">{cat.Name}</a>
              </div>)
          })}
        </div>
      </div>
    )
  }
}

export default CategoryMenu