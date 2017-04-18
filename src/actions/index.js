import fetch from 'isomorphic-fetch'
import keys from '../utilities/apiKeys.json';

export const REQUEST_NYT_BESTSELLERS = 'REQUEST_NYT_BESTSELLERS'
export function requestBestSellers(category){
  return {
    type: REQUEST_NYT_BESTSELLERS,
    category
  }
}

export const RECEIVE_NYT_BESTSELLERS = 'RECEIVE_NYT_BESTSELLERS'
export function receiveBestSellers(category, results){
  var bestSellers = results.map(result => {
    return {
      title: result.book_details[0].title,
      author: result.book_details[0].author,
      rank: result.rank,
      category: result.display_name,
      image: result.image,
      description: result.description,
    }
  })

  return{
    type: RECEIVE_NYT_BESTSELLERS,
    category,
    bestSellers: bestSellers,
    date: results.last_modified
  }
}

export function fetchAndMergeBestSellers(category){

  return function(dispatch) {
    //Update UI w/ fetching
    dispatch(requestBestSellers(category))

    //Fetch NYT best sellers
    return fetchNytBestSellers(category, dispatch)
      .then(nytResults => fetchAndMergeGoogleList(nytResults.results))
      .then(aggregatedResults => dispatch(receiveBestSellers(category, aggregatedResults)))
    }
}

function fetchNytBestSellers(category){
    let url = `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${keys.nyt_key}&list=${category}`
    return fetch(url)
      .then(response => response.json())
}

function fetchAndMergeGoogleList(nytBooks){
  var nytBooksTest = nytBooks.slice(0,3)

  var googlePromises = nytBooksTest.map(nytBook => fetchAndMergeGoogleBook(nytBook))
  return Promise.all(googlePromises)
}

function fetchAndMergeGoogleBook(nytBook){
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${nytBook.book_details[0].primary_isbn10}`
  return fetch(url)
    .then(response => response.json())
    .then(googleJson => mergeBookData(nytBook, googleJson))
}

//nastyness.  Will fix
function mergeBookData(nytBook, googleJson){
  if (googleJson.items && googleJson.items[0]){
      nytBook.image = googleJson.items[0].volumeInfo.imageLinks.thumbnail
      nytBook.publishedDate = googleJson.items[0].volumeInfo.publishedDate
      nytBook.description= googleJson.items[0].volumeInfo.description
  }else{
      nytBook.image = 'http://www.i2clipart.com/cliparts/f/9/4/d/clipart-sad-face-outline-128x128-f94d.png'
  }
  return nytBook
}
