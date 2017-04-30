import React from 'react'
import CategoryMenu from './CategoryMenu'

const styles = {
  leftNav:{
    //border:'1px solid red',
    width:200,
    padding:'10px 16px 16px 20px'
  },
  navBody:{
    //border:'1px solid blue',
    //maxHeight:642,
    overflow:'hidden'
  },
}

class LeftNav extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expandedMenu:'AMZ'
    }
  }

  handleExpanding = (menu) => {
    this.setState({
      expandedMenu: menu
    })
  }

  getCategories(menuCode){
    return this.props.categories.filter(cat => cat.listSourceId === menuCode)
  }

  render(){
    if (this.props.isFetchingCategories){
      return <p>Loading...</p>
    } else {
      return (
        <div style={styles.leftNav}>
          <div style={styles.navBody}>
            <CategoryMenu menuName='Amazon' 
              menuCode='AMZ'
              handleExpanding={this.handleExpanding}
              handleCategoryChange={this.props.handleCategoryChange}
              categories={this.getCategories('AMZ')} 
              expanded={this.state.expandedMenu === 'AMZ'}/>
            <CategoryMenu menuName='New York Times' 
              menuCode='NYT'
              handleExpanding={this.handleExpanding }
              handleCategoryChange={this.props.handleCategoryChange}
              categories={this.getCategories('NYT')} 
              expanded={this.state.expandedMenu === 'NYT'}/>
          </div>
        </div>
      )
    }
  }




}

export default LeftNav