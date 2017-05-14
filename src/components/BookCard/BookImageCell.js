import React from 'react'

const styles={
  wrapper:{
    width:'160px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  bookImageDiv: {
    marginBottom:'10px',
  },
  bookImage:{
    borderRadius:'2px',
  },
  buyButton:{
    width:'100px',
    height:'30px',
    backgroundColor:'#4d90fe',
    //backgroundColor:'#f1ad57', //amazon color
    //border:'1px solid #a56616', //amazon
    //backgroundColor:'linear-gradient(to bottom,#f6c88f,#ed9220)', //amazon gradient
    border:'1px solid #dcdcdc',
    fontWeight: 'bold',
    fontSize:'11px',
    color:'#FFF',
    borderRadius:'2px',
    cursor: 'pointer',
  },

}

class BookImageCell extends React.Component{
  onBuyButtonClick = () => {
    console.log(this)
    alert('purchased')
  }
  render(){
    return (
      <div style={styles.wrapper}>
        <div style={styles.bookImageDiv}>
          <img src={this.props.mediumImage} style={styles.bookImage} alt={this.props.bookTitle} />
        </div>

        <a href={this.props.buyLink} target="_blank">
          <button style={styles.buyButton}>
            Buy on Amazon
          </button>
        </a>
      </div>

    )
  }
}

export default BookImageCell
