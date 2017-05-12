import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import Star from 'material-ui/svg-icons/toggle/star';
import StarHalf from 'material-ui/svg-icons/toggle/star-half';
import StarEmpty from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  wrapper:{
    maxWidth:'235px',//matched up with amazon iframe
    display:'flex',
    flexDirection:'row',
    //paddingLeft:'16px',
    //border:'1px solid red'
  },
  title:{
    fontSize:'13px',
    padding:'0px 5px 0px 0px',
    width:'100px',
    textAlign:'right'
  },
  starsWrapper:{
    width:'110px',
    display:'flex'
  },
  starIcon:{
    width:15,
    height:15,
  },
  stats:{
    //paddingTop:'3px',
    fontSize:'13px',
  }
}

class StarRating extends React.Component{
  render(){
    //styles.starIcon.color = this.props.starColor ? this.props.starColor : '#f44336'
    return(
      <div style={styles.wrapper}>
        <div style={styles.title}>{this.props.source} </div>
        <div style={styles.starsWrapper}>
          <StarRatingComponent
            name="rate"
            value={Number(this.props.rating)}
            starCount={5}
            renderStarIcon={(index, value) => { return index <= value ? <Star style={styles.starIcon}/> : <StarEmpty style={styles.starIcon}/>}}
            renderStarIconHalf={() => <StarHalf style={styles.starIcon}/>}
            editing={false}
          />

          <span style={styles.stats}>&nbsp;{this.props.rating}</span>
        </div>
      </div>
    )
  }
}
export default StarRating
