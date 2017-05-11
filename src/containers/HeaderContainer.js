import { connect } from 'react-redux'
import { fetchAndMergeBestSellers } from '../actions'
import Header from '../components/Header'

const mapStateToProps = ({categoryState}) => {
  return {
    selectedCategory: categoryState.selectedCategory
  }
}

const HeaderContainer = connect(
  mapStateToProps,
)(Header)

export default HeaderContainer
