import { connect } from 'react-redux'
import { toggleBooks, requestBestSellers } from '../../actions'
import BestSellersList from '../../components/BestSellersList'

const mapStateToProps = (state) => {
  return {
    showBooks: state.toggleDisplay,
    isFetching: state.loadState.isFetching,
    bestSellers: state.loadState.bestSellers
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggleClick: () => {
      dispatch(toggleBooks())
    },
    onButtonClick: () => {
      dispatch(requestBestSellers('Science'))
    }
  }
}

const BestSellersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BestSellersList)

export default BestSellersListContainer
