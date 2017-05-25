import React from 'react'
import CategoryMenu from './CategoryMenu'
import './LeftNav.css'

class LeftNav extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expandedMenu:'NYT',
      sticky: false
    }
  }

  handleExpanding = (menu) => {
    this.setState({
      expandedMenu: menu
    })
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll = () => {
    if (window.scrollY >= 96 && !this.state.sticky) {
      this.setState({sticky: true})
    } else if (window.scrollY < 96 && this.state.sticky) {
      this.setState({sticky: false});
    }
  }

  getCategories(menuCode){
    return this.props.categories.filter(cat => cat.listSourceId === menuCode && cat.visible)
  }

  render(){

    if (this.props.isFetchingCategories){
      return <p>Loading...</p>
    } else {
      return (
        <div className='left-nav-wrapper'>
          <div className={`left-nav ${this.state.sticky ? 'sticky':''}`}>
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
