import React from 'react'
import './BookCollapsibleDescription.css'

const styles = {
  description:{
    fontSize:'13px',
    color:'#333',
    //border: '1px solid blue',
    cursor: 'pointer',
    padding: '0px 0px 0px 0px',
    //marginTop:'20px'
  },
}

class BookCollapsibleDescription extends React.Component {
  createMarkup(description) {
    return {__html: description};
  }

  render(){
    let description = (<div className='short-description' style={styles.newDescriptionClosed} dangerouslySetInnerHTML={this.createMarkup(this.props.description)}/>)
    if (this.props.expanded){
      description = (<div className='long-description' dangerouslySetInnerHTML={this.createMarkup(this.props.description)}/>)
    }

    return (
      <div style={styles.description}>
          {description}
      </div>
    )
  }
}

export default BookCollapsibleDescription
