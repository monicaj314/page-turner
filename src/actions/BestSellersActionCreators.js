import fetch from 'isomorphic-fetch'
import keys from '../utilities/apiKeys.json'
import { requestCategories, receiveCategories, updateCategory} from './CategoryActionCreators'

export const REQUEST_NYT_BESTSELLERS = 'REQUEST_NYT_BESTSELLERS'
export function requestBestSellers(category){
  return {
    type: REQUEST_NYT_BESTSELLERS,
    category
  }
}

export const RECEIVE_NYT_BESTSELLERS = 'RECEIVE_NYT_BESTSELLERS'
export function receiveBestSellers(category, result){
  return {
    type: RECEIVE_NYT_BESTSELLERS,
    category: category,
    bestSellers: result,
  }
}

export function fetchBestSellers(categoryId){
  return (dispatch) => {
    dispatch(requestBestSellers(categoryId))

    const url = `http://localhost:3000/api/best-sellers?categoryId=${categoryId}`
    return fetch(url)
      .then(response => response.json())
      .then(results => dispatch(receiveBestSellers(categoryId, results)))
  }
}

export function initLoad(initCategoryId){
  return function (dispatch){
    dispatch(requestCategories)

    return fetch('http://localhost:3000/api/book-categories')
      .then(response => response.json())
      .then(json => dispatch(receiveCategories(json)))
      .then(() => dispatch(updateCategory(initCategoryId)))
      .then(() => dispatch(fetchBestSellers(initCategoryId)))
  }
}
