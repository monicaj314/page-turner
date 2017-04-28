import React from 'react'
import CategorySource from './CategorySource'

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
  render(){
    if (this.props.amzIsFetchingCategories){
      return <p>Loading...</p>
    } else {
      return (
        <div style={styles.leftNav}>
          <div style={styles.navBody}>
            <CategorySource sourceName='Amazon' categories={this.props.amzCategories} />
            <CategorySource sourceName='New York Times' categories={this.props.amzCategories} />
          </div>
        </div>
      )
    }
  }




}

export default LeftNav