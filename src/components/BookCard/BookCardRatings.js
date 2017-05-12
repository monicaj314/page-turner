import React from 'react'
import StarRating from './StarRating'
import AmazonRating from './AmazonRating'

const styles = {
  ratingsWrapper:{
    display:'flex',
    flexDirection:'column',
    //justifyContent: 'space-between',
    //maxHeight:'180px',
    //minWidth:'500px',
    //border:'1px solid green'
  },
  starRatingDiv:{
    padding:'2px 0px',
    //border:'1px solid blue'
  }
}

class BookCardRatings extends React.Component {
  render(){
    const reviews = this.props.reviews
    return (
      <div style={styles.ratingsWrapper}>
        <div style={styles.starRatingDiv}>
          {reviews.goodreads && reviews.goodreads.averageRating ?
          <StarRating
            source="Goodreads"
            rating={reviews.goodreads.averageRating}
            ratingsCount={reviews.goodreads.ratingsCount}/>
          : null}
        </div>

        <div style={styles.starRatingDiv}>
          {reviews.google && reviews.google.averageRating ?
          <StarRating
            source="Google Books"
            rating={reviews.google.averageRating}
            ratingsCount={reviews.google.ratingsCount}
            starColor="#1565c0"/>
            : null
          }
        </div>

        {/* <div style={styles.bottomRowRatings}>
          <AmazonRating {...this.props} />
        </div> */}

      </div>
    )
  }
}

export default BookCardRatings
