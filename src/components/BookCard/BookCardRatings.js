import React from 'react'
import StarRating from './StarRating'
import AmazonRating from './AmazonRating'

const styles = {
  ratingsWrapper:{
    display:'flex',
    flexDirection:'column',
    justifyContent: 'space-between',
    maxHeight:'180px',
    minWidth:'500px',
    //border:'1px solid green'
  },
  topRowRatings:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    //border:'1px solid red',
    width:'430px' //matches amazon widget width
  },
  bottomRowRatings:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    width:'430px' //matches amazon widget width
  },
}

class BookCardRatings extends React.Component {
  render(){
    return (
      <div style={styles.ratingsWrapper}>
        <div style={styles.topRowRatings}>
          <StarRating 
            source="Goodreads"
            rating={this.props.reviews.goodreads.averageRating} 
            ratingsCount={this.props.reviews.goodreads.ratingsCount}/>
          
          <StarRating 
            source="Google"
            rating={this.props.reviews.goodreads.averageRating} 
            ratingsCount={this.props.reviews.goodreads.ratingsCount}
            starColor="#1565c0"
          />
        </div>
        <div style={styles.bottomRowRatings}>
          <AmazonRating {...this.props} />
        </div>
        
      </div>
    )
  }
}

export default BookCardRatings