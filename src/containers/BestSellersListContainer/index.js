import { connect } from 'react-redux'
import { toggleBooks, fetchAndAggregateBestSellers } from '../../actions'
import BestSellersList from '../../components/BestSellersList'

const mapStateToProps = (state) => {
  return {
    showBooks: state.toggleDisplay,
    isFetching: state.loadState.isFetching,
    bestSellers: state.loadState.bestSellers,
    category: state.loadState.category
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggleClick: () => {
      dispatch(toggleBooks())
    },
    onButtonClick: () => {
      dispatch(fetchAndAggregateBestSellers())
    },
    onDropdownChange: (category) => {
      dispatch(fetchAndAggregateBestSellers(category))
    }
  }
}

const BestSellersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BestSellersList)

export default BestSellersListContainer
