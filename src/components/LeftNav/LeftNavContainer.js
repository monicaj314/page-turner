import { connect } from "react-redux";
import LeftNav from "./LeftNav";
import { updateCategory } from "../../actions";

const mapStateToProps = ({ categoryState }, ownProps) => {
  return {
    selectedCategoryId: categoryState.selectedCategory.id,
    categories: categoryState.categories,
    isFetchingCategories: categoryState.isFetchingCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCategoryChange: categoryId => {
      dispatch(updateCategory(categoryId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
