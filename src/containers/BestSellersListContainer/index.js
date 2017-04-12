import { connect } from 'react-redux'
import { toggleBooks, addBook } from '../../actions'
import BestSellersList from '../../components/BestSellersList'

const mapStateToProps = (state) => {
  return {
    showBooks: state.toggleDisplay,
    books: state.books
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggleClick: () => {
      dispatch(toggleBooks())
    },
    onButtonClick: () => {
      dispatch(addBook())
    }
  }
}

const BestSellersListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BestSellersList)

export default BestSellersListContainer
