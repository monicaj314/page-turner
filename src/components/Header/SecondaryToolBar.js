import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import CategoryDropDownContainer from '../../containers/CategoryDropDownContainer'


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
};

class SecondaryToolBar extends React.Component{
  render(){
    return (
    <Toolbar style={styles.secondaryToolBar}>
      <ToolbarGroup>
        <ToolbarTitle style={styles.secondaryToolBarTitle} text="Best Sellers" />
      </ToolbarGroup>
      <ToolbarGroup>

        <CategoryDropDownContainer />
      </ToolbarGroup>
    </Toolbar>
    )
  }
}

export default SecondaryToolBar
