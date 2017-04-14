import fetch from 'isomorphic-fetch'
import keys from '../utilities/apiKeys.json';

export const TOGGLE_BOOKS = 'TOGGLE_BOOKS'
export function toggleBooks() {
  return {
    type: TOGGLE_BOOKS
  }
}


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
      description: result.book_details[0].description,
    }
  })

  return{
    type: RECEIVE_NYT_BESTSELLERS,
    category,
    bestSellers: bestSellers,
    date: results.last_modified
  }
}

export function fetchAndAggregateBestSellers(category){

  return function(dispatch) {
    //Update UI w/ fetching
    dispatch(requestBestSellers(category))

    //Fetch NYT best sellers
    return fetchNytBestSellers(category, dispatch)
      .then(nytResults => fetchAllGoogleData(nytResults.results))
      .then(aggregatedResults => dispatch(receiveBestSellers(category, aggregatedResults)))
    }
}

function fetchAllGoogleData(nytBooks){
  //var testBooks = nytBooks.slice(0,4)

  var googlePromises = nytBooks.map(nytBook => fetchGoogleBookData(nytBook))
  return Promise.all(googlePromises)
}

function fetchNytBestSellers(category){
    let url = `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${keys.nyt_key}&list=${category}`
    return fetch(url)
      .then(response => response.json())
}

function fetchGoogleBookData(nytBook){
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
  }else{
      nytBook.image = 'http://i2.kym-cdn.com/photos/images/original/000/295/544/a63.png'
  }
  return nytBook
}
