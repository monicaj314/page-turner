import { connect } from 'react-redux'
import Header from './Header'

const mapStateToProps = ({categoryState}) => {
  return {
    selectedCategory: categoryState.selectedCategory
  }
}

const HeaderContainer = connect(
  mapStateToProps,
)(Header)

export default HeaderContainer
