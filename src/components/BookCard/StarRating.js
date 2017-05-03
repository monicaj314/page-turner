import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import Star from 'material-ui/svg-icons/toggle/star';
import StarHalf from 'material-ui/svg-icons/toggle/star-half';
import StarEmpty from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  wrapper:{
    maxWidth:'235px',
    display:'flex',
    flexDirection:'column',
    //border:'1px solid red'
  },
  title:{
    fontSize:'16px',
    fontWeight:'bold',
    padding:'5px 0px'
  },
  starsWrapper:{
    display:'flex',
  },
  starIcon:{
    color:'#f44336',
    width:20,
    height:20,
  },
  stats:{
    paddingTop:'3px',
    fontSize:'12px',
    fontWeight:'bold'
    //border:'1px solid green'
  }
}

class StarRating extends React.Component{
  render(){
    return(
      <div style={styles.wrapper}>
        <div style={styles.title}>{this.props.source}</div>
        <div style={styles.starsWrapper}>
          <StarRatingComponent style={{border:'1px solid yellow'}}
            name="rate" 
            value={Number(this.props.rating)} 
            starCount={5} 
            renderStarIcon={(index, value) => { return index <= value ? <Star style={styles.starIcon}/> : <StarEmpty style={styles.starIcon}/>}}
            renderStarIconHalf={() => <StarHalf style={styles.starIcon}/>}
            editing={false}
          />
          <span style={styles.stats}>{this.props.rating}&nbsp;&nbsp;-&nbsp;&nbsp;{this.props.ratingsCount} ratings</span>
        </div>
      </div>
    )    
  }
}
export default StarRating