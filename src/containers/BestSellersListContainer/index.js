import { connect } from 'react-redux'
import { fetchAndMergeBestSellers } from '../../actions'
import BestSellersList from '../../components/BestSellersList'

const mapStateToProps = (state) => {
  return {
    isFetching: state.loadState.isFetching,
    bestSellers: state.loadState.bestSellers,
    category: state.loadState.category
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDropdownChange: (category) => {
      dispatch(fetchAndMergeBestSellers(category))
    }
  }
}

const BestSellersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BestSellersList)

export default BestSellersListContainer
