import { combineReducers } from 'redux'
import { TOGGLE_BOOKS, REQUEST_NYT_BESTSELLERS, RECEIVE_NYT_BESTSELLERS } from '../actions'

const initialState = {
  isFetching: false,
  category: 'Combined Print and E-Book Fiction',
  showBooks: true,
  bestSellers: [],
  lastModified: null
}

function toggleBooksReducer(state=initialState.showBooks, action){
  switch (action.type){
    case TOGGLE_BOOKS:
      return !state
    default:
      return state
  }
}

function bestSellersReducer(state = {
  isFetching: initialState.isFetching,
  category: initialState.didInvalidate,
  bestSellers: initialState.bestSellers,
  lastModified: initialState.lastModified
}, action) {
  switch (action.type) {
    case REQUEST_NYT_BESTSELLERS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_NYT_BESTSELLERS:
      return Object.assign({}, state, {
        isFetching: false,
        category: action.category,
        bestSellers: action.bestSellers,
        lastModified: action.lastModified
      })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  toggleDisplay: toggleBooksReducer,
  loadState: bestSellersReducer
})

export default rootReducer
