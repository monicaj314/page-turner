import { connect } from 'react-redux'
import BestSellersList from '../components/BestSellersList'

const mapStateToProps = ({bestSellersState}) => {
  return {
    isFetching: bestSellersState.isFetchingBestSellers,
    bestSellers: bestSellersState.bestSellers,
  }
}

const BestSellersListContainer = connect(
  mapStateToProps
)(BestSellersList)

export default BestSellersListContainer
