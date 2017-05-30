import { connect } from 'react-redux'
import React from 'react'
import BestSellersList from './BestSellersList'
import { fetchBestSellers } from '../../actions'


class BestSellersListContainer extends React.Component {
  componentDidMount() {
    const { selectedCategoryId, fetchBestSellers } = this.props
    console.log(`Best Sellers just mounted.  Fetching books for:${selectedCategoryId}`)
    fetchBestSellers(selectedCategoryId)
  }

  componentWillReceiveProps(nextProps){
    if (this.props.selectedCategoryId !== nextProps.selectedCategoryId) {
      console.log(`Received update for SELECTED CATEGORY prop: ${nextProps.selectedCategoryId} - fetching best sellers`)
      this.props.fetchBestSellers(nextProps.selectedCategoryId)
    }
  }

  render(){
    return (
      <BestSellersList {...this.props}/>
    )
  }
}


const mapStateToProps = ({ bestSellersState, categoryState }, ownProps) => {
  return {
    isFetching: bestSellersState.isFetchingBestSellers,
    bestSellers: bestSellersState.bestSellers,
    selectedCategoryId: categoryState.selectedCategory.id
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchBestSellers: (categoryId) => {
        dispatch(fetchBestSellers(categoryId))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BestSellersListContainer)
