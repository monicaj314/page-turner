import React from 'react'

const styles = {
  leftNav:{
    //border:'1px solid red',
    width:200,
    padding:'10px 16px 16px 20px'
  },
  navBody:{
    //border:'1px solid blue',
  },
  rankSource:{
    fontSize:'13px',
    fontWeight:'bold',
    padding: '0px 0px 2px 0px',
  },
  category:{
    fontSize:'13px',
    padding: '2px 0px 2px 10px',
  }
}

class LeftNav extends React.Component {
  render(){
    if (this.props.amzIsFetchingCategories){
      return <p>Loading...</p>
    } else {
      return (
        <div style={styles.leftNav}>
          <div style={styles.navBody}>
            <div style={styles.rankSource}>Amazon</div>
            {this.props.amzCategories.map((cat) => {
              return (<div key={cat.Id} style={styles.category}>
                <a href="#">{cat.Name}</a>
                </div>)
            })}
            <div style={styles.rankSource}>New York Times</div>
            {this.props.amzCategories.map((cat) => {
              return (<div key={cat.Id} style={styles.category}>
                <a href="#">{cat.Name}</a>
                </div>)
            })}
          </div>
        </div>
      )
    }
  }




}

export default LeftNav