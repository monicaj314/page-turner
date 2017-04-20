import React from 'react'

const styles = {
  readMoreLinkVisible:{
    opacity:'1',
    transition: 'opacity 600ms ease-out',
    marginLeft: 10
  },
  readMoreLinkNotVisible:{
    opacity:'0',
    transition: 'opacity 300ms ease-in',
    marginLeft: 10
  }
}

export const ShortDescription = ({isCardOpen, fullDescription, onReadLinkClick}) => {
  let description = fullDescription.slice(0,3)

  return(
    <div>
      {description.map((sentence, key) => {
          return <span key={key}>{sentence}&nbsp;</span>
      })}

      <a style={isCardOpen ? styles.readMoreLinkNotVisible : styles.readMoreLinkVisible } href="#" onClick={onReadLinkClick}>Read More</a>
    </div>
  )
}

export const LongDescription = ({fullDescription, onReadLinkClick}) => {
    let description = fullDescription.slice(3, fullDescription.length)

    return(
      <div><br/>
        {description.map((sentence, key) => {
          if ((key+1) % 4 === 0){
            return(<span key={key}>{sentence}<br/><br/></span>)
          } else {
            return <span key={key}>{sentence}&nbsp;</span>
          }
        })}
        <a style={{marginLeft:'20px'}} href="#" onClick={onReadLinkClick}>Read Less...</a>

      </div>
    )
}
