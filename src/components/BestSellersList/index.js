import React from 'react'
import BookCard from '../BookCard'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
  listWrapper:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    marginLeft:'150px'
  },
}


class BestSellerList extends React.Component {

  render(){
    if (this.props.isFetching){
      return <p>Loading..</p>
    } else {
      var cards = this.props.bestSellers.map((book, i) => (
        <BookCard key={i} {...book} />)
        )

      return <div style={styles.listWrapper}>{cards}</div>
    }
  }
}

export default BestSellerList
