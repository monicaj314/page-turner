import fetch from 'isomorphic-fetch'

export const REQUEST_NYT_CATEGORIES = 'REQUEST_NYT_CATEGORIES'
export function requestNytCategories(){
  return {
    type: REQUEST_NYT_CATEGORIES,
  }
}

export const RECEIVE_NYT_CATEGORIES = 'RECEIVE_NYT_CATEGORIES'
export function receivetNytCategories(){
  return {
    type: RECEIVE_NYT_CATEGORIES,
  }
}

export const REQUEST_AMAZON_CATEGORIES = 'REQUEST_AMAZON_CATEGORIES'
export function requestAmazonCategories(){
  return {
    type: REQUEST_AMAZON_CATEGORIES,
  }
}

export const RECEIVE_AMAZON_CATEGORIES = 'RECEIVE_AMAZON_CATEGORIES'
export function receiveAmazonCategories(){
  return {
    type: RECEIVE_AMAZON_CATEGORIES,
  }
}

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
    amzCategories: results
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
    return fetchAmazonCategories(dispatch)
      .then(results => dispatch(receiveCategories(results)))
    }
}

function fetchAmazonCategories(){
  const url = 'http://localhost:3000/api/amazon-categories'
  return fetch(url)
    .then(response => response.json())
}