import { combineReducers } from 'redux'
import { REQUEST_NYT_BESTSELLERS, RECEIVE_NYT_BESTSELLERS, UPDATE_CATEGORY } from '../actions'

const init = {
  isFetchingBestSellers: false,
  selectedCategoryId: '',
  bestSellers: [],
  amazon:{
    categories:[],
    isFetchingCategories:false,
  },
  nyt:{
    categories:[],
    isFetchingCategories:false,
  },
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
  amazon: init.amazon,
  nyt: init.nyt
}, action){
  switch (action.type) {
    case UPDATE_CATEGORY:
      return Object.assign({}, state, {
        selectedCategoryIndex: action.categoryIndex,
      })
    case REQUEST_CATEGORIES:
      
    case RECEIVE_CATEGORIES:
      
    default:
      return state
  }
}


const rootReducer = combineReducers({
  bestSellersState: bestSellersReducer,
  categoryState: categoryReducer
})

export default rootReducer
