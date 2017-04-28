import { connect } from 'react-redux'
import LeftNav from './LeftNav'

const mapStateToProps = ({categoryState}) => {
  return {
    selectedCategoryIndex: categoryState.selectedCategoryId,
    amzCategories: categoryState.amzCategories,
    amzIsFetchingCategories: categoryState.amzIsFetchingCategories,
  }
}

const LeftNavContainer = connect(
  mapStateToProps,
)(LeftNav)

export default LeftNavContainer
