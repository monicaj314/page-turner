import React from "react";
import "./BookHeading.css";

class BookHeading extends React.Component {
  render() {
    return (
      <div>
        <div className="book-title">
          <a
            href={this.props.titleLink}
            target="_blank"
            className="book-title-link"
          >
            {this.props.title}
          </a>
        </div>
        <span className="authors">
          {this.props.authors ? "by " + this.props.authors.join(", ") : null}
        </span>
        <span className="book-binding">{this.props.binding}</span>
      </div>
    );
  }
}

export default BookHeading;
