import React from "react";

const styles = {
  reviewsWrapper: {
    display: "flex"
  },
  reviewsDiv: {
    display: "flex",
    flexDirection: "column"
  },
  reviewLabel: {
    fontSize: "13px",
    padding: "0px 25px 0px 0px",
    width: "100px",
    textAlign: "right"
  },
  reviewLink: {
    fontSize: "13px",
    paddingBottom: "2px",
    color: "#15c",
    textDecoration: "none"
  }
};

class EditorialReview extends React.Component {
  editorialReviewsAvailable(reviews) {
    return reviews.some(
      review => review.type === "editorial" && review.content
    );
  }
  isEditorialReview(review) {
    return review.type === "editorial" && review.content;
  }
  render() {
    let reviews = null;

    if (this.editorialReviewsAvailable(this.props.reviews)) {
      reviews = (
        <div style={styles.reviewsWrapper}>
          <span style={styles.reviewLabel}>Editorial Reviews</span>
          <div style={styles.reviewsDiv}>
            {this.props.reviews.map((review, i) => {
              if (this.isEditorialReview(review)) {
                return (
                  <a
                    key={i}
                    style={styles.reviewLink}
                    target="_blank"
                    href={review.content}
                  >
                    {review.contentTitle}
                  </a>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      );
    }

    return reviews;
  }
}
export default EditorialReview;
