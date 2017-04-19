import { connect } from 'react-redux'
import { fetchAndMergeBestSellers } from '../actions'
import Header from '../components/Header'

const mapStateToProps = (state) => {
  return {
    selectedCategoryIndex: state.selectedCategoryIndex
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onUpdateCategory: (category) => {
      dispatch(fetchAndMergeBestSellers('Science'))
    }
  }
}


const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
