import React from 'react'
import './AmazonRating.css'
import amazonLogo from './amazon-logo-tiny.gif';

const styles = {
  wrapper:{
    //border: '1px solid black',
    width:'430px',
    height:'100px',
    overflow:'hidden',
    position:'relative',
  },
  imgDiv: {
    position: 'absolute', 
    zIndex:'1', 
    width:'240px', 
    height:'30px', 
    backgroundColor:'#FFF',
    //border: '1px solid blue',
  },
  iframe:{
    border: '0px gray dashed',
    width:'430px',
    height:'150px',
    marginTop: '-50px',
  }
}

class AmazonRating extends React.Component {
  iframeLoadListener(e){
    console.log('loaded')
  }
  render(){
    return (
    <div style={styles.wrapper}>
      <div style={styles.imgDiv}>
        <img style={{margin:'5px 0px 0px 16px'}} src={amazonLogo}/>
      </div>
      
        <iframe style={styles.iframe} 
          scrolling="no"
          onLoad={this.iframeLoadListener}
          src={this.props.reviews.amz.customerReviews[0].iframeUrl} 
        />
      
    </div>
    )
  }
}

export default AmazonRating