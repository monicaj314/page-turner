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
export function updateCategory(categoryId){
  return function(dispatch, getState){
    //consider using reselect
    const category = getState().categoryState.categories.find(cat=>cat.id === categoryId)
    dispatch({
      type: UPDATE_CATEGORY,
      category
    })
  }
}

export function fetchCategories(){
  return function(dispatch) {
    dispatch(requestCategories())
    const url = `/api/book-categories`

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json)))
  }
}
