import { combineReducers } from 'redux'
import { REQUEST_NYT_BESTSELLERS, 
  RECEIVE_NYT_BESTSELLERS, 
  UPDATE_CATEGORY, 
  REQUEST_CATEGORIES, 
  RECEIVE_CATEGORIES } from '../actions'

const init = {
  isFetchingBestSellers: false,
  selectedCategoryId: '',
  bestSellers: [],
  amzCategories: [],
  amzIsFetchingCategories: true,
  nytCategories: [],
  nytIsFetchingCategories: false,
}

function bestSellersReducer(state = {
  isFetching: init.isFetchingBestSellers,
  bestSellers: init.bestSellers
}, action) {
  switch (action.type) {
    case REQUEST_NYT_BESTSELLERS:
      return Object.assign({}, state, {
        isFetchingBestSellers: true,
      })
    case RECEIVE_NYT_BESTSELLERS:
      return Object.assign({}, state, {
        isFetchingBestSellers: false,
        bestSellers: action.bestSellers,
      })
    default:
      return state
  }
}

function categoryReducer(state = {
  selectedCategoryId: init.selectedCategoryId,
  amzCategories: init.amzCategories,
  amzIsFetchingCategories: init.amzIsFetchingCategories,
  nytCategories: init.nytCategories,
  nytIsFetchingCategories: init.nytIsFetchingCategories,
}, action){
  switch (action.type) {
    case UPDATE_CATEGORY:
      return Object.assign({}, state, {
        selectedCategoryIndex: action.categoryIndex,
      })
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        amzIsFetchingCategories: true,
        nytIsFetchingCategories: true
      })
    case RECEIVE_CATEGORIES:
      debugger;
      console.log('ACTION.AMZ', action.amzCategories)
      return Object.assign({}, state, {
        amzIsFetchingCategories: false,
        nytIsFetchingCategories: false,
        amzCategories: action.amzCategories,
        //nytCategories: action.nytCategories
      })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  bestSellersState: bestSellersReducer,
  categoryState: categoryReducer
})

export default rootReducer
