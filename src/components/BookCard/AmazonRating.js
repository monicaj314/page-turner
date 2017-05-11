import React from 'react'
import amazonLogo from './amazon-logo-tiny.gif';
import CircularProgress from 'material-ui/CircularProgress';

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
  },
  loadingDiv:{
    height:'100px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    opacity:1,
  },
  hideLoadingDiv:{
    height:'100px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    transition: 'opacity 500ms ease-out',
    opacity:0,
  },
  contentVisible:{
    opacity:1,
    transition: 'opacity 500ms ease-in',
  },
  contentNotVisible:{
    opacity:0,
  }
}

class AmazonRating extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loading:true
    }
  }

  iframeLoadListener = (e) => {
    this.setState({
      loading:false
    })
  }
  render(){

    return (
    <div style={styles.wrapper}>
      <div style={this.state.loading ? styles.loadingDiv : {display:'none'}}>
        <span style={{margin:'auto', color:'#333'}}>Loading..</span>
      </div>
      <div style={this.state.loading ? styles.contentNotVisible: styles.contentVisible }>

        <div style={styles.imgDiv}>
          {/*<img style={{margin:'5px 0px 0px 16px'}} src={amazonLogo}/>*/}
          <span style={{margin:'5px 0px 0px 16px'}}>Amazon</span>
        </div>
        <iframe style={styles.iframe}
          scrolling="no"
          onLoad={this.iframeLoadListener}
          src={this.props.reviews.amz.customerReviews[0].iframeUrl}
        />

      </div>
    </div>
    )
  }
}

export default AmazonRating
