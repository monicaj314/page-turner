import React from 'react'
import BookCard from '../BookCard'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './BestSellersList.css'
import BlockLoader from '../Shared/BlockLoader'

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
      return <BlockLoader />
    } else {
      var cards = this.props.bestSellers.map((book, i) => (
          <BookCard key={i} {...book} />
        ))
    }

      return (
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={3000}
          transitionEnter={true}
          transitionLeave={true}>
          <div style={styles.listWrapper}>
            {cards}
          </div>
        </CSSTransitionGroup>
      )
  }
}

export default BestSellerList
