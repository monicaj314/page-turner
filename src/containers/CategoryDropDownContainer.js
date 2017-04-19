import { connect } from 'react-redux'
import CategoryDropDown from '../components/Header/CategoryDropDown'
import { updateCategory, fetchAndMergeBestSellers } from '../actions'

const mapStateToProps = ({categoryState}) => {
  return {
    selectedCategoryIndex: categoryState.selectedCategoryIndex,
    categories: categoryState.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    updateCategory: (category) => {
      dispatch(updateCategory(category.list_name_encoded))
      dispatch(fetchAndMergeBestSellers(category.list_name))
    }
  }
}

const CategoryDropDownContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDropDown)

export default CategoryDropDownContainer
