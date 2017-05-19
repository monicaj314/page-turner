import React from 'react'
import BookCard from '../BookCard'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './BestSellersList.css'
import BlockLoader from '../Shared/BlockLoader'

const styles = {
  listWrapper:{
    //border:'1px solid blue',
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
        <div style={styles.listWrapper}>
          <CSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={3000}
            transitionEnter={false}
            transitionLeave={false}>
              {cards}
          </CSSTransitionGroup>
        </div>
      )
  }
}

export default BestSellerList
