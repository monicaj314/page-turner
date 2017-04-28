import { connect } from 'react-redux'
import LeftNav from './LeftNav'
import { updateCategory, fetchAndMergeBestSellers } from '../actions/CategoryActionCreators'

const mapStateToProps = ({categoryState}) => {
  return {
    selectedCategoryIndex: categoryState.selectedCategoryIndex,
    categories: categoryState.categories
  }
}

const CategoryDropDownContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftNav)

export default CategoryDropDownContainer
