import { connect } from 'react-redux'
import { toggleBooks, fetchBestSellers } from '../../actions'
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
      dispatch(fetchBestSellers())
    },
    onDropdownChange: (category) => {
      dispatch(fetchBestSellers(category))
    }
  }
}

const BestSellersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BestSellersList)

export default BestSellersListContainer
