import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'


const styles ={
  menuText:{
    fontSize:'14px',
    color: '#444',
    lineHeight:'30px',
    minHeight:'30px',
    paddingLeft:'16px',
  }
}

class ToolBarNav extends React.Component {

  getCategoriesBySource = (source) => {
    return this.props.categories.filter(cat => cat.listSourceId === source && cat.visible)
  }

  handleTouchTap = (categoryId) => {
    this.props.handleDrawerSelection(categoryId)
  }

  render() {
    return (
      <Drawer
        docked={false}
        overlayStyle={{backgroundColor:'rgba(0, 0, 0, 0)'}}
        containerStyle={{top:'96px'}}
        width={300}
        open={this.props.open}
        onRequestChange={(open) => this.props.handleRequestChange(open)}
      >

        <Subheader style={{lineHeight:'32px'}}>The New York Times</Subheader>
        {this.getCategoriesBySource('NYT').map(cat => {
          return <MenuItem key={cat.id}
            onTouchTap={this.handleTouchTap.bind(null, cat.id)}
            style={styles.menuText}
            value={cat.id}
            primaryText={cat.name} />
        })}

        <Subheader style={{lineHeight:'32px'}}>Amazon</Subheader>
          {this.getCategoriesBySource('AMZ').map(cat => {
            return <MenuItem key={cat.id}
              onTouchTap={this.handleTouchTap.bind(null, cat.id)}
              value={cat.id}
              style={styles.menuText}
              primaryText={cat.name} />
          })}

      </Drawer>
    )
  }

}

export default ToolBarNav
