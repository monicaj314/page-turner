import fetch from 'isomorphic-fetch'
import { DEFAULT_CATEGORY_ID } from '../constants'

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
    let categoryState = getState().categoryState

    //consider using reselect
    let category = getState().categoryState.categories.find(cat => cat.id === categoryId)
    category = validateCategory(category, categoryState)

    dispatch({
      type: UPDATE_CATEGORY,
      category
    })
  }
}

export function updateCategoryWithUrlParam(urlParam){
  return function(dispatch, getState){
    let categoryState = getState().categoryState

    //consider using reselect
    let category = categoryState.categories.find(cat => cat.urlParam === urlParam)
    category = validateCategory(category, categoryState)

    dispatch({
      type: UPDATE_CATEGORY,
      category
    })
  }
}

function validateCategory(category, categoryState){
  if (!category && categoryState.selectedCategory){
    console.log('Did not find category.  Keeping selected category.')
    return categoryState.selectedCategory
  }
  else if (!category) {
    console.log(`Did not find category.  Setting default:${DEFAULT_CATEGORY_ID}`)
    return categoryState.categories.find(cat => cat.id === DEFAULT_CATEGORY_ID)
  } else {
    return category
  }
}

export const INITIAL_CATEGORY_LOAD_START = 'INITIAL_CATEGORY_LOAD_START'
export function initialCategoryLoadStart(){
  return {
    type: INITIAL_CATEGORY_LOAD_START,
  }
}

export const INITIAL_CATEGORY_LOAD_COMPLETE = 'INITIAL_CATEGORY_LOAD_COMPLETE'
export function initialCategoryLoadComplete(){
  return {
    type: INITIAL_CATEGORY_LOAD_COMPLETE,
  }
}

export function fetchCategories(){
  return function(dispatch) {
    dispatch(requestCategories())
    const url = `${process.env.REACT_APP_API_URL}/api/book-categories`

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json)))
  }
}

export function initCategoryLoad(initCategoryId){
  return function (dispatch){
    dispatch(initialCategoryLoadStart())

    fetchCategories()(dispatch)
      .then(() => dispatch(updateCategoryWithUrlParam(initCategoryId)))
      .then(() => dispatch(initialCategoryLoadComplete()))
  }
}
