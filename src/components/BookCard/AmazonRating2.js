import React from 'react'

const styles = {
  wrapper:{
    display:'flex',
    //border: '1px solid black',

  },
  iframeWrapper:{
    //border: '1px solid black',
    //width:'430px',
    height:'17px',
    overflow:'hidden',
  },
  title:{
    fontSize:'13px',
    padding:'0px 5px 0px 0px',
    width:'100px',
    textAlign:'right'
  },
  iframe:{
    border: '0px gray dashed',
    width:'300px',
    height:'116px',
    marginTop: '-100px',
  },
  loadingDiv:{
    opacity:1,
    marginLeft:'18px'
  },
  hideLoadingDiv:{
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

class AmazonRating2 extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loading:true,
    }
  }

  iframeLoadListener = (e) => {
    this.setState({
      loading:false
    })
  }

  getIframeUrl(){
    const amazonReview = this.props.reviews.find(review => review.source === 'Amazon')
    return amazonReview ? amazonReview.content : ''
  }

  render(){
    this.props.reviews.find(review => review.source === 'Amazon')

    return (
    <div style={styles.wrapper}>
      <div style={styles.title}>Amazon </div>
      <div style={styles.iframeWrapper}>
        <div style={this.state.loading ? styles.loadingDiv : {display:'none'}}>
          <span style={{color:'#333'}}>N/A</span>
        </div>
        <div style={this.state.loading ? styles.contentNotVisible: styles.contentVisible }>
          <iframe style={styles.iframe}
            scrolling="no"
            onLoad={this.iframeLoadListener}
            src={this.getIframeUrl()}
          />
        </div>
      </div>
    </div>
    )
  }
}

export default AmazonRating2
