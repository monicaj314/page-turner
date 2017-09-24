import React from "react";
import StarRating from "./StarRating";
import AmazonRating from "./AmazonRating2";

const styles = {
  ratingsWrapper: {
    display: "flex",
    flexDirection: "column"
    //justifyContent: 'space-between',
    //maxHeight:'180px',
    //minWidth:'500px',
    //border:'1px solid green'
  },
  starRatingDiv: {
    padding: "2px 0px"
    //border:'1px solid blue'
  }
};

class BookCardRatings extends React.Component {
  onStarClickHalfStar(nextValue, prevValue, name) {
    console.log(
      "name: %s, nextValue: %s, prevValue: %s",
      name,
      nextValue,
      prevValue
    );
  }

  render() {
    const ratings = this.props.ratings;
    return (
      <div style={styles.ratingsWrapper}>
        <div style={styles.starRatingDiv}>
          <AmazonRating {...this.props} />
        </div>

        {ratings.google && ratings.google.averageRating ? (
          <div style={styles.starRatingDiv}>
            <StarRating
              source="Google Books"
              rating={ratings.google.averageRating}
              ratingsCount={ratings.google.ratingsCount}
              starColor="#1565c0"
            />
          </div>
        ) : null}

        {ratings.goodreads && ratings.goodreads.averageRating ? (
          <div style={styles.starRatingDiv}>
            <StarRating
              source="Goodreads"
              rating={ratings.goodreads.averageRating}
              ratingsCount={ratings.goodreads.ratingsCount}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default BookCardRatings;
