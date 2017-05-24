import { connect } from 'react-redux'
import Header from './Header'
import { updateCategory, fetchBestSellers } from '../../actions'

const mapStateToProps = ({categoryState}) => {
  return {
    selectedCategory: categoryState.selectedCategory,
    categories: categoryState.categories
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      handleCategoryChange: (categoryId) => {
        dispatch(updateCategory(categoryId))
        dispatch(fetchBestSellers(categoryId))
      }
    }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
