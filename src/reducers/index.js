import { combineReducers } from 'redux'
import { REQUEST_BESTSELLERS,
  RECEIVE_BESTSELLERS,
  UPDATE_CATEGORY,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
  INITIAL_CATEGORY_LOAD_START,
  INITIAL_CATEGORY_LOAD_COMPLETE,
} from '../actions'

const init = {
  isAppLoading: true,
  isFetchingBestSellers: true,
  selectedCategory: null,
  bestSellers: [],
  isFetchingCategories: false,
  categories:[]
}

function mainApp(state = {
  isAppLoading: init.isAppLoading
}, action) {
  switch (action.type) {
    case INITIAL_CATEGORY_LOAD_START:
      return Object.assign({}, state, {
        isAppLoading: true,
      })
    case INITIAL_CATEGORY_LOAD_COMPLETE:
      return Object.assign({}, state, {
        isAppLoading: false,
      })
    default:
      return state
  }
}

function bestSellersReducer(state = {
  isFetchingBestSellers: init.isFetchingBestSellers,
  bestSellers: init.bestSellers
}, action) {
  switch (action.type) {
    case REQUEST_BESTSELLERS:
      return Object.assign({}, state, {
        isFetchingBestSellers: true,
      })
    case RECEIVE_BESTSELLERS:
      return Object.assign({}, state, {
        isFetchingBestSellers: false,
        bestSellers: action.bestSellers,
      })
    default:
      return state
  }
}

function categoryReducer(state = {
  isFetchingCategories: init.isFetchingCategories,
  selectedCategory: init.selectedCategory,
  categories: init.categories
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
  categoryState: categoryReducer,
  app: mainApp
})

export default rootReducer
