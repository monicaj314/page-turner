import React from 'react'
import IconButton from 'material-ui/IconButton';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less';
//import ActionStar from 'material-ui/svg-icons/toggle/star';
import Tokenizer from 'sentence-tokenizer'
import { LongDescription, ShortDescription } from './BookDescription'

const styles = {
  card: {
    display: 'flex',

    //border: '1px solid blue',
    borderBottom: '1px solid rgb(224,224,224)',
    padding: '10px',
    //maxHeight: '200px',

  },
  rankDiv:{
    padding:'0px 15px',
    //border: '1px solid blue',
  },
  rankText:{
    color: '#444',
    fontSize:'x-large'
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
  bookDetails:{
    //border: '1px solid red',
    maxWidth: 600
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
    padding: '0px 0px 20px 0px'
  },
  bookCardClosed:{
    maxHeight:0,
    transition: 'max-height 400ms ease-out',
    overflow:'hidden',
  },
  bookCardOpen:{
    maxHeight: 1000,
    transition: 'max-height 400ms ease-in',
    overflow:'hidden',
  },
  small: {
    width: 15,
  },
}
class BookCard extends React.Component {
  constructor(props){
    super(props)
    var tokenizer = new Tokenizer('Desc')
    tokenizer.setEntry(props.description)
    const allSentences = tokenizer.getSentences()
    const showReadMore = allSentences.length > 3
    let shortDescription = showReadMore ? allSentences.slice(0,3) : allSentences
    this.state = {
      expanded: false,
      fullDescription: allSentences,
      shortDescription: shortDescription,
    }
  }

  handleExpanding = (event) => {
    event.preventDefault();
    const newExpandedState = !this.state.expanded
    this.setState({
      expanded: newExpandedState
    })
  }

  render(){
    return (
      <div style={styles.card}>
        <div style={styles.rankDiv}>
          <span style={styles.rankText}>{this.props.rank}</span>
        </div>
        <div style={styles.bookImageDiv}>
          <img src={this.props.image} style={styles.bookImage} alt={this.props.title} />
        </div>
        <div style={styles.bookDetails}>
          <a href="https://google.com" style={styles.title}>{this.props.title}</a>
          <span style={styles.author}>by {this.props.author}</span>
          <div style={styles.description}>
              <div onClick={this.handleExpanding}>
                <ShortDescription isCardOpen={this.state.expanded} fullDescription={this.state.fullDescription} onReadLinkClick={this.handleExpanding} />
              </div>
              <div style={this.state.expanded ? styles.bookCardOpen : styles.bookCardClosed} onClick={this.handleExpanding}>
                <LongDescription fullDescription={this.state.fullDescription} onReadLinkClick={this.handleExpanding} />
              </div>
          </div>
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


// {!this.state.expanded
//   ? <ShortDescription desc={this.state.shortDescription} handleExpanding={this.handleExpanding}/>
//   :this.state.fullDescription.map((item, key) => {
//   if ((key+1) % 3 === 0){
//     return(<span key={key}>{item}<br/><br/></span>)
//   } else {
//     return <span key={key}>{item}&nbsp;</span>
//   }
// })}
