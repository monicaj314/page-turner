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
    console.log('categories', this.props.categories)
    return (
      <div style={styles.leftNav}>
        <div style={styles.navBody}>
          {this.props.categories.map((cat) => {
            return (<p>{cat.title}</p>)
          })}
        </div>
      </div>
    )
  }
}

export default LeftNav