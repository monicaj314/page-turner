import React from "react";
import IconButton from "material-ui/IconButton";
import OpenIcon from "material-ui/svg-icons/navigation/expand-more";
import CloseIcon from "material-ui/svg-icons/navigation/expand-less";
import BookCardRatings from "./BookCardRatings";
import EditorialReview from "./EditorialReview";
import BookImageCell from "./BookImageCell";
import BookHeading from "./BookHeading";
import "./BookCard.css";
import BookCollapsibleDescription from "./BookCollapsibleDescription";

class BookCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleExpanding = event => {
    event.preventDefault();
    const newExpandedState = !this.state.expanded;
    this.setState({
      expanded: newExpandedState
    });
  };

  createMarkup(description) {
    return { __html: description };
  }

  render() {
    return (
      <div className="book-card">
        {/* MOBILE */}
        <div className="book-card-header-mob">
          <div>
            <span className="rank-text">{this.props.rank}</span>
          </div>

          <div>
            <BookImageCell
              mediumImage={this.props.mediumImage}
              smallImage={this.props.smallImage}
              bookTitle={this.props.amzTitle}
              buyLink={this.props.amazonLink}
            />
          </div>

          <div className="book-card-title-mob">
            <BookHeading
              titleLink={this.props.amazonLink}
              title={this.props.amzTitle}
              authors={this.props.authors}
              binding={this.props.binding}
            />
          </div>
        </div>

        <div
          className="book-card-description-mob"
          onClick={this.handleExpanding}
        >
          <BookCollapsibleDescription
            expanded={this.state.expanded}
            description={this.props.amzDescription}
          />
        </div>

        <div className="book-card-footer-mob">
          <span
            style={{
              fontSize: "13px",
              lineHeight: "36px",
              color: "#737373",
              cursor: "pointer"
            }}
            onClick={this.handleExpanding}
          >
            {this.state.expanded ? "Show less" : "Show more"}
          </span>
          <IconButton
            style={{ width: 36, height: 36, padding: 0 }}
            iconStyle={{ height: "20px", width: "20px" }}
          >
            {this.state.expanded ? (
              <CloseIcon onClick={this.handleExpanding} />
            ) : (
              <OpenIcon onClick={this.handleExpanding} />
            )}
          </IconButton>
        </div>

        {/* DESKTOP */}
        <div className="rank-div">
          <span className="rank-text">{this.props.rank}</span>
        </div>

        <div className="book-card-image">
          <BookImageCell
            mediumImage={this.props.mediumImage}
            smallImage={this.props.smallImage}
            bookTitle={this.props.amzTitle}
            buyLink={this.props.amazonLink}
          />
        </div>

        <div className="book-t-r-d">
          <div className="book-title-and-ratings">
            <div>
              <BookHeading
                titleLink={this.props.amazonLink}
                title={this.props.amzTitle}
                authors={this.props.authors}
                binding={this.props.binding}
              />
            </div>
            <div>
              <BookCardRatings {...this.props} />
              <EditorialReview reviews={this.props.reviews} />
            </div>
          </div>

          <div className="book-card-description" onClick={this.handleExpanding}>
            <BookCollapsibleDescription
              expanded={this.state.expanded}
              description={this.props.amzDescription}
            />
          </div>
          <div className="book-card-footer">
            <span
              style={{
                fontSize: "13px",
                lineHeight: "36px",
                color: "#737373",
                cursor: "pointer"
              }}
              onClick={this.handleExpanding}
            >
              {this.state.expanded ? "Show less" : "Show more"}
            </span>
            <IconButton
              style={{ width: 36, height: 36, padding: 0 }}
              iconStyle={{ height: "20px", width: "20px" }}
            >
              {this.state.expanded ? (
                <CloseIcon onClick={this.handleExpanding} />
              ) : (
                <OpenIcon onClick={this.handleExpanding} />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;
