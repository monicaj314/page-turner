import React from 'react'
//import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import CloseIcon from 'material-ui/svg-icons/navigation/expand-less';
import ActionStar from 'material-ui/svg-icons/toggle/star';

//import DropDownMenu from 'material-ui/DropDownMenu';
//import MenuItem from 'material-ui/MenuItem';
import Tokenizer from 'sentence-tokenizer'

const styles = {
  card: {
    display: 'flex',
    margin: '0px 20px',
    //border: '1px solid blue',
    borderBottom: '1px solid rgb(224,224,224)',
    padding: '10px',
    //maxHeight: '200px',

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
  bookDetails:{
    //border: '1px solid red',
    maxWidth: 550
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
    marginBottom:'20px'

  },
  description:{
    fontSize:'12px',
    display:'block',
    color:'#333',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    //border: '1px solid blue',
  },
  small: {
    width: 15,
  },
}

const ShortDescription = ({desc, handleExpanding}) => {
  return (
    <div>
      {desc.map((sentence, key)=>{
        return <span key={key}>{sentence}&nbsp;</span>
      })}
      &nbsp;&nbsp;<a href="#" onClick={handleExpanding}>Read more...</a>
    </div>
  )
}

class BookCard extends React.Component {
  constructor(props){
    super(props)
    var tokenizer = new Tokenizer('Desc')
    tokenizer.setEntry(props.description)
    const allSentences = tokenizer.getSentences()
    let shortDescription = (allSentences.length) > 3 ? allSentences.slice(0,3) : allSentences
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
        <div style={styles.rank}>
          {this.props.rank}
        </div>
        <div style={styles.bookImageDiv}>
          <img src={this.props.image} style={styles.bookImage} alt={this.props.title} />
        </div>
        <div style={styles.bookDetails}>
          <span style={styles.title}>{this.props.title}</span>
          <span style={styles.author}>by {this.props.author}</span>
          <span style={styles.description}>
            {!this.state.expanded
              ? <ShortDescription desc={this.state.shortDescription} handleExpanding={this.handleExpanding}/>
              :this.state.fullDescription.map((item, key) => {
              if ((key+1) % 3 === 0){
                return(<span key={key}>{item}<br/><br/></span>)
              } else {
                return <span key={key}>{item}&nbsp;</span>
              }
            })}
          </span>
        </div>
        <div>
            <ActionStar style={styles.small}/>
            <ActionStar style={styles.small}/>
            <ActionStar style={styles.small}/>
            <ActionStar style={styles.small}/>
            <ActionStar style={styles.small}/>
        </div>
        <div>
          <IconButton tooltip="Read more!">
            {this.state.expanded
              ? <CloseIcon onClick={this.handleExpanding}/>
              : <OpenIcon onClick={this.handleExpanding}/>}
          </IconButton>
        </div>
      </div>)
    }
  }

export default BookCard
