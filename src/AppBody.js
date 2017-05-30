import React from 'react'
import { connect } from 'react-redux'
import BestSellersList from './components/BestSellersList'
import LeftNavContainer from './components/LeftNav'
import CircularProgress from 'material-ui/CircularProgress';
import { updateCategoryWithUrlParam, initCategoryLoad } from './actions'
import { DEFAULT_CATEGORY_URL_PARAM } from './constants'


class AppBody extends React.Component {
  constructor(props) {
    super(props)
    let categoryUrlParam = DEFAULT_CATEGORY_URL_PARAM
    if (this.props.match.params.id){
      categoryUrlParam = this.props.match.params.id
      console.log(`App initialized.  Found a category in the URL: ${categoryUrlParam}`)
    } else {
      console.log(`App initialized.  Did not find a category in the URL.  Setting to default ${categoryUrlParam}`)
    }
    this.state = {
      categoryUrlParam: categoryUrlParam,
    }
  }

  //catch prop changes sent down by react router
  componentWillReceiveProps(nextProps){
    const currentUrlCategoryParam = this.props.match.params.id
    const nextUrlCategoryParam = nextProps.match.params.id
    if (currentUrlCategoryParam !== nextUrlCategoryParam){
      console.log('Found different category in URL. Dispatching update for '+ nextProps.match.params.id)
      this.props.updateCategoryWithUrlParam(nextUrlCategoryParam)
    }
  }

  componentDidMount(){
    console.log(`Init loading categories and updating selected category to: ${this.state.categoryUrlParam}`)
    this.props.initializeWithCategory(this.state.categoryUrlParam)
  }

  render(){
    let body = (
      <div style={{display:'flex', height:'100vh'}}>
        <div style={{margin:'auto'}}>
          <CircularProgress />
        </div>
      </div>
    )

    if (!this.props.isAppLoading) {
      body = (
        <div className='body-wrapper'>
          <LeftNavContainer />
          <BestSellersList />
        </div>
      )
    }

    return (
      <div>
        {body}
      </div>
    )
  }
}

const mapStateToProps = ({app}) => {
  return {
    isAppLoading: app.isAppLoading
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      updateCategoryWithUrlParam: (categoryUrlParam) => {
        dispatch(updateCategoryWithUrlParam(categoryUrlParam))
      },
      initializeWithCategory: (categoryUrlParam) => {
        dispatch(initCategoryLoad(categoryUrlParam))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBody)
