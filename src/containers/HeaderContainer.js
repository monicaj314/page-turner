import { connect } from 'react-redux'
import { fetchAndMergeBestSellers } from '../actions'
import Header from '../components/Header'

const mapStateToProps = ({categoryState}, getState) => {
  return {
    selectedCategoryId: categoryState.selectedCategoryId,
    categoryName: categoryState.categoryName
  }
}

const HeaderContainer = connect(
  mapStateToProps,
)(Header)

export default HeaderContainer
