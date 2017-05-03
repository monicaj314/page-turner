import React from 'react'
import IconButton from 'material-ui/IconButton'
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more'
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less'
import BookCardRatings from './BookCardRatings'


//delete
import { LongDescription, ShortDescription } from './BookDescription'
import './BookCard.css'

const styles = {
  card: {
    display: 'flex',
    //border: '1px solid blue',
    borderBottom: '1px solid rgb(224,224,224)',
    padding: '10px 0px',
  },
  rankDiv:{
    //border: '1px solid blue',
    width:'35px'
  },
  rankText:{
    color: '#444',
    fontSize:'x-large'
  },
  bookImageDiv: {
    //border: '1px solid blue',
    marginRight:'20px',
    minWidth:'115px'
  },
  bookImage:{
    
  },
  bookDetails:{
    //border: '1px solid red',
    width: '450px'
  },
  title:{
    //border: '1px solid blue',
    display: 'block',
    padding: '5px 0px',
  },
  titleLink:{
    color:'#15c',
    textDecoration: 'none',
    fontSize:'20px',
    fontWeight: 'bold',
  },
  author:{
    fontSize:'14px',
    color: 'gray',
    display:'block',
    //border: '1px solid blue',
    padding: '2px 0px',
    marginBottom:'20px'

  },
  description:{
    fontSize:'14px',
    color:'#333',
    //border: '1px solid blue',
    cursor: 'pointer',
    padding: '0px 0px 0px 0px'
  },
  small: {
    width: 15,
  },
  
}

class BookCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expanded: false,
    }
  }

  handleExpanding = (event) => {
    event.preventDefault()
    const newExpandedState = !this.state.expanded
    this.setState({
      expanded: newExpandedState
    })
  }

  createMarkup(description) {
    return {__html: description};
  }

  render(){
    let firstAuthor = 'Needs fixin..'
    if (this.props.authors){
      firstAuthor = this.props.authors[0]
    }

    let description = (<div className='short-description' style={styles.newDescriptionClosed} dangerouslySetInnerHTML={this.createMarkup(this.props.amzDescription)}/>)
    if (this.state.expanded){
      description = (<div className='long-description' dangerouslySetInnerHTML={this.createMarkup(this.props.amzDescription)}/>)
    }

    return (
      <div style={styles.card}>
        
        <div style={styles.rankDiv}>
          <span style={styles.rankText}>{this.props.rank}</span>
        </div>
        
        <div style={styles.bookImageDiv}>
          <img src={this.props.mediumImage} style={styles.bookImage} alt={this.props.amzTitle} />
        </div>
        
        <div style={styles.bookDetails}>
          <div style={styles.title}>
            <a href={this.props.amazonLink} target="_blank" style={styles.titleLink}>{this.props.amzTitle}</a>
          </div>
          <span style={styles.author}>by {firstAuthor}</span>
          <div style={styles.description} onClick={this.handleExpanding}>
              {description}
          </div>
        </div>

        <BookCardRatings {...this.props} />

        <div>
          <IconButton tooltip={this.state.expanded ? 'Read Less!' : 'Read More!'}>
            {this.state.expanded
              ? <CloseIcon onClick={this.handleExpanding}/>
              : <OpenIcon onClick={this.handleExpanding}/>}
          </IconButton>
        </div>
      </div>)
    }
  }

export default BookCard
