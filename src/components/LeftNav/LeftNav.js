import React from 'react'

const styles = {
  leftNav:{
    //border:'1px solid red',
    width:150,
    padding:'10px 16px 16px 30px'
  },
  navBody:{
    //border:'1px solid blue',
  }
}

class LeftNav extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    if (this.props.amzIsFetchingCategories){
      return <p>Loading...</p>
    } else {
      console.log('categories', this.props.amzCategories)
      return (
        <div style={styles.leftNav}>
          <div style={styles.navBody}>
            {this.props.amzCategories.map((cat) => {
              return (<p>{cat.Name}</p>)
            })}
          </div>
        </div>
      )
    }
  }




}

export default LeftNav