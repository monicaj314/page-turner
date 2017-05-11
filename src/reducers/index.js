import { combineReducers } from 'redux'
import { REQUEST_NYT_BESTSELLERS,
  RECEIVE_NYT_BESTSELLERS,
  UPDATE_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES } from '../actions'

const init = {
  isFetchingBestSellers: false,
  //selectedCategoryId: 'nyt-0',
  selectedCategory: null,
  //categoryName: 'Combined Print & E-Book Fiction',
  //categoryListSource:'NYT',
  bestSellers: [],
  isFetchingCategories: false,
  categories:[]
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
  //selectedCategoryId: init.selectedCategoryId,
  isFetchingCategories: init.isFetchingCategories,
  categoryName: init.categoryName,
  selectedCategory: init.selectedCategory
}, action){
  switch (action.type) {
    case UPDATE_CATEGORY:
      return Object.assign({}, state, {
        selectedCategory: action.category
      })
    case REQUEST_CATEGORIES:
      return Object.assign({}, state, {
        isFetchingCategories: true,
      })
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isFetchingCategories: false,
        categories: action.categories,
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
