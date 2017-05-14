import React from 'react'
import IconButton from 'material-ui/IconButton'
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more'
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less'
import BookCardRatings from './BookCardRatings'
import EditorialReview from './EditorialReview'
import BookImageCell from './BookImageCell'
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

  bookDetails:{
    //border: '1px solid red',
    width: '450px',
    margin:'0px 20px'
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
    //border: '1px solid blue',
    padding: '2px 0px',
    display:'block'
  },
  binding:{
    fontSize:'12px',
    color: 'gray',
    padding: '2px 0px',
    fontStyle:'italic'
  },
  isbn:{
    fontSize:'14px',
    color: 'gray',
    border: '1px solid blue',
    padding: '2px 0px',
  },
  description:{
    fontSize:'13px',
    color:'#333',
    //border: '1px solid blue',
    cursor: 'pointer',
    padding: '0px 0px 0px 0px',
    marginTop:'20px'
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
    let description = (<div className='short-description' style={styles.newDescriptionClosed} dangerouslySetInnerHTML={this.createMarkup(this.props.amzDescription)}/>)
    if (this.state.expanded){
      description = (<div className='long-description' dangerouslySetInnerHTML={this.createMarkup(this.props.amzDescription)}/>)
    }

    return (
      <div style={styles.card}>

        <div style={styles.rankDiv}>
          <span style={styles.rankText}>{this.props.rank}</span>
        </div>

        <BookImageCell mediumImage={this.props.mediumImage} bookTitle={this.props.amzTitle} buyLink={this.props.amazonLink} />

        <div style={styles.bookDetails}>
          <div style={styles.title}>
            <a href={this.props.amazonLink} target="_blank" style={styles.titleLink}>{this.props.amzTitle}</a>
          </div>
          <span style={styles.author}>{this.props.authors ? 'by '+ this.props.authors.join(", ") : null}</span>
          <span style={styles.binding}>{this.props.binding}</span>

          <div style={styles.description} onClick={this.handleExpanding}>
              {description}
          </div>
        </div>
        <div>
          <BookCardRatings {...this.props} />
          <EditorialReview reviews={this.props.reviews}/>
        </div>

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
