import React from 'react'

const styles = {
  link:{
    display: 'block',
    color:'#15c',
    textDecoration: 'none',
    margin:'-8px 0px 0px 0px'
  },
  readMoreLinkVisible:{
    opacity:'1',
    transition: 'opacity 600ms ease-out',
  },
  readMoreLinkNotVisible:{
    opacity:'0',
    transition: 'opacity 300ms ease-in',
  }
}

export const ShortDescription = ({isCardOpen, fullDescription, onReadLinkClick}) => {
  const paragraphs = fullDescription.split(/<p>(.*?)<\/p>/g)
  const firstTwoParagraphs = paragraphs.slice(0, 4)

  for (var i = 1; i < firstTwoParagraphs.length; i += 2) {
    firstTwoParagraphs[i] = <p key={i}>{firstTwoParagraphs[i]}</p>;
  }
  const dynamicLinkstyle = isCardOpen ? styles.readMoreLinkNotVisible : styles.readMoreLinkVisible

  return(
    <div>
      {firstTwoParagraphs}
      <a style={{...styles.link, ...dynamicLinkstyle}} href="#" onClick={onReadLinkClick}>Read More&nbsp;»</a>
    </div>
  )
}


export const LongDescription = ({fullDescription, onReadLinkClick}) => {
    const paragraphs = fullDescription.split(/<p>(.*?)<\/p>/g)
    const allParagraphsExceptFirst = paragraphs.slice(2, paragraphs.length-1) //last p is empty

    for (var i = 1; i < allParagraphsExceptFirst.length; i += 2) {
      allParagraphsExceptFirst[i] = <p key={i}>{allParagraphsExceptFirst[i]}</p>;
    }

    return(
      <div>
        {allParagraphsExceptFirst}
        <a style={styles.link} href="#" onClick={onReadLinkClick}>Read Less&nbsp;&laquo;</a>
      </div>
    )
}


export const ShortDescription2 = ({isCardOpen, fullDescription, onReadLinkClick}) => {
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



export const LongDescription2 = ({fullDescription, onReadLinkClick}) => {
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
        <a style={{marginLeft:'20px'}} href="#" onClick={onReadLinkClick}>Read Less &nbsp;&laquo;</a>

      </div>
    )
}
