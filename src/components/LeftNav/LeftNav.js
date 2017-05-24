import React from 'react'
import CategoryMenu from './CategoryMenu'
import './LeftNav.css'

class LeftNav extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expandedMenu:'NYT'
    }
  }

  handleExpanding = (menu) => {
    this.setState({
      expandedMenu: menu
    })
  }

  getCategories(menuCode){
    return this.props.categories.filter(cat => cat.listSourceId === menuCode && cat.visible)
  }

  render(){
    if (this.props.isFetchingCategories){
      return <p>Loading...</p>
    } else {
      return (
        <div className='left-nav'>
          <div className='nav-body'>
            <CategoryMenu menuName='New York Times'
              menuCode='NYT'
              handleExpanding={this.handleExpanding }
              handleCategoryChange={this.props.handleCategoryChange}
              selectedCategoryId={this.props.selectedCategoryId}
              categories={this.getCategories('NYT')}
              expanded={this.state.expandedMenu === 'NYT'}/>
            <CategoryMenu menuName='Amazon'
              menuCode='AMZ'
              handleExpanding={this.handleExpanding}
              handleCategoryChange={this.props.handleCategoryChange}
              selectedCategoryId={this.props.selectedCategoryId}
              categories={this.getCategories('AMZ')}
              expanded={this.state.expandedMenu === 'AMZ'}/>

          </div>
        </div>
      )
    }
  }
}

export default LeftNav
