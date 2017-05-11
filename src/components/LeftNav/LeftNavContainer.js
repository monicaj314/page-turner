import { connect } from 'react-redux'
import LeftNav from './LeftNav'
import { updateCategory, fetchBestSellers } from '../../actions'

const mapStateToProps = ({categoryState}) => {
  return {
    selectedCategoryId: categoryState.selectedCategory.id,
    categories: categoryState.categories,
    isFetchingCategories: categoryState.isFetchingCategories,
  }
}

const mapDispatchToProps = (dispatch, getState) => {
    return {
      handleCategoryChange: (categoryId) => {
        dispatch(updateCategory(categoryId))
        dispatch(fetchBestSellers(categoryId))
      }
    }
}

const LeftNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftNav)

export default LeftNavContainer
