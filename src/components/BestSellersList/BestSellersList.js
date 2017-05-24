import React from 'react'
import BookCard from '../BookCard/index2.js'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './BestSellersList.css'
import BlockLoader from '../Shared/BlockLoader'

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
        <div className='best-seller-list-wrapper'>
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
