import fetch from 'isomorphic-fetch'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export function requestCategories(){
  return {
    type: REQUEST_CATEGORIES,
  }
}

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export function receiveCategories(results){
  return {
    type: RECEIVE_CATEGORIES,
    categories: results
  }
}

export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export function updateCategory(categoryIndex){
  return {
    type: UPDATE_CATEGORY,
    categoryIndex
  }
}

export function fetchCategories(){
  return function(dispatch) {
    dispatch(requestCategories())

    return fetch('http://localhost:3000/api/book-categories-test')
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json)))
  }
}