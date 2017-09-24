import React from "react";
import StarRatingComponent from "react-star-rating-component";
import Star from "material-ui/svg-icons/toggle/star";
import StarHalf from "material-ui/svg-icons/toggle/star-half";
import StarEmpty from "material-ui/svg-icons/toggle/star-border";

const styles = {
  wrapper: {
    maxWidth: "235px", //matched up with amazon iframe
    display: "flex",
    flexDirection: "row"
    //paddingLeft:'16px',
    //border:'1px solid red'
  },
  title: {
    fontSize: "13px",
    padding: "0px 23px 0px 0px",
    width: "100px",
    textAlign: "right"
  },
  starsWrapper: {
    width: "110px",
    display: "flex"
  },
  starIcon: {
    width: 14,
    height: 14,
    marginRight: "-4px"
  },
  stats: {
    //paddingTop:'3px',
    marginLeft: "7px",
    fontSize: "13px"
  }
};

class StarRating extends React.Component {
  render() {
    //styles.starIcon.color = this.props.starColor ? this.props.starColor : '#f44336'
    //console.log('-----------------------')
    //console.log(this.props.source)
    //console.log('number: '+ Number(this.props.rating))
    var ratingPlusOne = Number(this.props.rating) + 1; //hack to fix rating issue with component
    //console.log('number+1: '+ ratingPlusOne)
    return (
      <div style={styles.wrapper}>
        <div style={styles.title}>{this.props.source} </div>
        <div style={styles.starsWrapper}>
          <StarRatingComponent
            name="rate"
            value={ratingPlusOne}
            starCount={5}
            renderStarIcon={(index, value) => {
              if (value > index) {
                //console.log(`value:${value} > index:${index} -?- show full star`)
                return <Star style={styles.starIcon} />;
              } else {
                //console.log(`value:${value} is not > index:${index} -?- show empty star`)
                return <StarEmpty style={styles.starIcon} />;
              }
            }}
            renderStarIconHalf={(index, value) => {
              //console.log(`value:${value} - index:${index} -?- show half star`)
              return <StarHalf style={styles.starIcon} />;
            }}
            editing={false}
          />

          <span style={styles.stats}>&nbsp;{this.props.rating}</span>
        </div>
      </div>
    );
  }
}
export default StarRating;
