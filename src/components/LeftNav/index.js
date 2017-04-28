import React from 'react'

const styles = {
  leftNav:{
    //border:'1px solid red',
    width:150,
    padding:'1px 16px 16px 30px'
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
    return (
      <div style={styles.leftNav}>
        <div style={styles.navBody}>
          Links
        </div>
      </div>
    )
  }
}

export default LeftNav