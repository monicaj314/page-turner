import { ADD_BOOK, TOGGLE_BOOKS } from '../actions'
import { combineReducers } from 'redux'

const initialState = {
  showBooks: true,
  books: [{
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman'
  },
  {
    title: 'Losing Faith',
    author: 'Sam Harris'
  },
  {
    // eslint-disable-next-line 
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford'
  },
  {
    title: 'Death by Black Hole',
    author: 'Neil DeGrasse Tyson'
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin'
  },
  {
    title: 'Understanding ECMAScript 6',
    author: 'Nicolas C. Zakas'
  },
  ]
}


function toggleBooksReducer(state=initialState.showBooks, action){
  switch (action.type){
    case TOGGLE_BOOKS:
      return !state
    default:
      return state
  }
}


function addBooksReducer(state=initialState.books, action){
  switch (action.type) {
    case ADD_BOOK:
      return [...state, action.book]
    default:
      return state
  }
}

// function App(state = {}, action){
//   return {
//     showBooks: toggleBooksReducer(state, action),
//     books: addBooksReducer(state.books, action)
//   }
// }

const ReduxApp = combineReducers({
  toggleDisplay: toggleBooksReducer,
  books: addBooksReducer
})

export default ReduxApp
