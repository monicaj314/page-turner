import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  container: {
    display: 'flex',
    margin: '0px 20px',
    //border: '1px solid blue',
    borderBottom: '1px solid rgb(224,224,224)',
    padding: '10px'
  },
  rank:{
    padding:'0px 15px',
    //border: '1px solid blue',
  },
  bookImageDiv: {
    marginRight:'20px',
    width:'128px',
    height:'183px',
  },
  bookImage:{
    width: 'auto',
    height:'100%',
  },
  title:{
    fontSize:'20px',
    fontWeight: 'bold',
    //border: '1px solid blue',
    display: 'block',
    padding: '5px 0px'

  },
  author:{
    fontSize:'14px',
    color: 'gray',
    display:'block',
    //border: '1px solid blue',
    padding: '2px 0px',
    marginBottom:'40px'

  },
  description:{
    fontSize:'14px',
    display:'block'
    //border: '1px solid blue',
  },
}

class BookCard extends React.Component {
  constructor(){
    super()
  }
  render(){
    return (
      <div style={styles.container}>
        <div style={styles.rank}>{this.props.rank}</div>
        <div style={styles.bookImageDiv}>
          <img src={this.props.image} style={styles.bookImage} alt={this.props.title} />
        </div>

        <div>
          <span style={styles.title}>{this.props.title}</span>
          <span style={styles.author}>{this.props.author}</span>
          <span style={styles.description}>{this.props.description}</span>
        </div>
        <div>
          <p>test</p>
        </div>
      </ div>
    )
  }
}

export default BookCard
