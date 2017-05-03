import React from 'react'
import IconButton from 'material-ui/IconButton';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less';
//import ActionStar from 'material-ui/svg-icons/toggle/star';
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
  },
  bookImage:{
    
  },
  bookDetails:{
    //border: '1px solid red',
    width: '600px'
  },
  title:{
    color:'#15c',
    textDecoration: 'none',
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
  amzCustomerReviewsIframe:{
    border: '0px gray dashed',
    width:'430px',
    height:'150px'

  }
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

  iframeLoadListener(e){
    console.log('loaded')
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
          <a href={this.props.amazonLink} target="_blank" style={styles.title}>{this.props.amzTitle}</a>
          <span style={styles.author}>by {firstAuthor}</span>
          <div style={styles.description} onClick={this.handleExpanding}>
              {description}
              
          </div>
        </div>
        <iframe style={styles.amzCustomerReviewsIframe} 
          scrolling="no"
          onLoad={this.iframeLoadListener}
          src={this.props.reviews.amz.customerReviews[0].iframeUrl} 
        />

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
