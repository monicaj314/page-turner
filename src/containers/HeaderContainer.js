import { connect } from 'react-redux'
import { fetchAndMergeBestSellers } from '../actions'
import Header from '../components/Header'

const mapStateToProps = (state) => {
  return {
    category: state.loadState.category
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
