import React from 'react'
import IconButton from 'material-ui/IconButton'
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more'
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less'

const styles = {
  sourceDiv:{
    display:'flex',
    alignItems:'flex-end',
    //justifyContent:'space-between',
    cursor: 'pointer',
    //backgroundColor:'#f1f1f1'
  },
  sourceName:{
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

class CategorySource extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expanded: false,
    }
  }

  handleExpanding = (event) => {
    event.preventDefault()
    const newExpandedState = !this.state.expanded
    this.setState({
      expanded: newExpandedState
    })
  }
  
  render(){
    return(
      <div>
        <div style={styles.sourceDiv} onClick={this.handleExpanding}>
          <div style={styles.sourceName}>
            {this.props.sourceName}
          </div>
          <IconButton style={styles.iconDiv} iconStyle={styles.icon}>
            {this.state.expanded ? <CloseIcon /> : <OpenIcon />}
          </IconButton>
        </div>
        <div style={this.state.expanded ? styles.categoryMenuOpen : styles.categoryMenuClosed}>
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

export default CategorySource