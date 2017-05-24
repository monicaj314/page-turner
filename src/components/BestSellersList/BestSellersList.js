import React from 'react'
import BookCard from '../BookCard/index.js'
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
          <CSSTransitionGroup
            transitionName='best-seller-list'
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnter={false}
            transitionLeave={false}>
            <div className='best-seller-list-wrapper'>
              {cards}
            </div>
          </CSSTransitionGroup>
      )
  }
}

export default BestSellerList
