import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import CategoryDropDownContainer from '../../containers/CategoryDropDownContainer'


const styles = {
  toolBar:{
    backgroundColor: '#FFF',
    borderBottom:'1px solid rgb(224,224,224)',
    justifyContent: 'flex-start',
    //height: 40
  },
  toolBarTitle:{
    fontSize:'large',
    fontWeight:'bold',
    color:'#444',
    //border:'1px solid black',
    width:'200px',
  },
  titleText:{
    //border:'1px solid red',
    paddingLeft:'20px'
  }
};

class SecondaryToolBar extends React.Component{

  render(){
    var test = (<span style={styles.titleText}>Best Sellers</span>)
    return (
    <Toolbar style={styles.toolBar}>
      <ToolbarGroup firstChild={true}>
        <ToolbarTitle style={styles.toolBarTitle} text={test} />
      </ToolbarGroup>
      <ToolbarGroup>
        <p>{this.props.categoryName}</p>
      </ToolbarGroup>
    </Toolbar>
    )
  }
}

export default SecondaryToolBar
