import React from "react";
import "./BookImageCell.css";

class BookImageCell extends React.Component {
  render() {
    return (
      <div className="book-image-cell-wrapper">
        <div className="book-image-div-medium">
          <img
            className="book-image"
            src={this.props.mediumImage}
            alt={this.props.bookTitle}
          />
        </div>
        <div className="book-image-div-small">
          <img
            className="book-image"
            src={this.props.smallImage}
            alt={this.props.bookTitle}
          />
        </div>

        <a href={this.props.buyLink} target="_blank">
          <button className="buy-button">Buy on Amazon</button>
        </a>
      </div>
    );
  }
}

export default BookImageCell;
