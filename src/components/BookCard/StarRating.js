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
    fontSize:'16px',
    //padding:'5px 0px',
    width:'100px'
  },
  starsWrapper:{
    display:'flex',
    alignItems:'center',
    //border:'1px solid blue',
    minWidth:'130px'
  },
  starIcon:{
    width:20,
    height:20,
  },
  stats:{
    //paddingTop:'3px',
    fontSize:'12px',
    fontWeight:'bold'
  }
}

class StarRating extends React.Component{
  render(){
    //styles.starIcon.color = this.props.starColor ? this.props.starColor : '#f44336'
    return(
      <div style={styles.wrapper}>
        <div style={styles.title}>{this.props.source}</div>
        <div style={styles.starsWrapper}>
          <StarRatingComponent
            name="rate"
            value={Number(this.props.rating)}
            starCount={5}
            renderStarIcon={(index, value) => { return index <= value ? <Star style={styles.starIcon}/> : <StarEmpty style={styles.starIcon}/>}}
            renderStarIconHalf={() => <StarHalf style={styles.starIcon}/>}
            editing={false}
          />
          <span style={styles.stats}>{this.props.rating}</span>
        </div>
      </div>
    )
  }
}
export default StarRating
