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

  render(){
    if (this.props.amzIsFetchingCategories){
      return <p>Loading...</p>
    } else {
      return (
        <div style={styles.leftNav}>
          <div style={styles.navBody}>
            <CategoryMenu menuName='Amazon' 
              menuCode='AMZ'
              handleExpanding={this.handleExpanding}
              categories={this.props.amzCategories} 
              expanded={this.state.expandedMenu === 'AMZ'}/>
            <CategoryMenu menuName='New York Times' 
              menuCode='NYT'
              handleExpanding={this.handleExpanding }
              categories={this.props.amzCategories } 
              expanded={this.state.expandedMenu === 'NYT'}/>
          </div>
        </div>
      )
    }
  }




}

export default LeftNav