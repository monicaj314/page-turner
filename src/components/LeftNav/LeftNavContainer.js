import { connect } from 'react-redux'
import LeftNav from './LeftNav'
import { updateCategory, fetchAndMergeBestSellers2 } from '../../actions'

const mapStateToProps = ({categoryState}) => {
  return {
    selectedCategoryIndex: categoryState.selectedCategoryId,
    categories: categoryState.categories,
    isFetchingCategories: categoryState.isFetchingCategories,
  }
}

const mapDispatchToProps = (dispatch, getState) => {
    return {
      handleCategoryChange: (categoryId) => {
        //dispatch(updateCategory(category))
        dispatch(fetchAndMergeBestSellers2(categoryId))
      }
    }
}

const LeftNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftNav)

export default LeftNavContainer
