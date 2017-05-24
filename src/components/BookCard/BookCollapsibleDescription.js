import React from 'react'
import './BookCollapsibleDescription.css'

class BookCollapsibleDescription extends React.Component {
  createMarkup(description) {
    return {__html: description};
  }

  render(){
    let description = (<div className='short-description' dangerouslySetInnerHTML={this.createMarkup(this.props.description)}/>)
    if (this.props.expanded){
      description = (<div className='long-description' dangerouslySetInnerHTML={this.createMarkup(this.props.description)}/>)
    }

    return (
      <div className='description'>
          {description}
      </div>
    )
  }
}

export default BookCollapsibleDescription
