import fetch from 'isomorphic-fetch'

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
export function receiveBestSellers(category, json){
  var bestSellers = json.results.map(result => {
    return {
      title: result.book_details[0].title,
      author: result.book_details[0].author,
      rank: result.rank,
      category: result.display_name
    }
  })

  return{
    type: RECEIVE_NYT_BESTSELLERS,
    category,
    bestSellers: bestSellers,
    date: json.last_modified
  }
}

export function fetchBestSellers(category){
  return function(dispatch){

    //Update State to let UI know that we've going to start fetching.
    dispatch(requestBestSellers(category))

    let apiKey = 'c0b2ce3bdb324451871bcd8ccfe7c0eb'
    let url = `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${apiKey}&list=${category}`
    return fetch(url)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(receiveBestSellers(category, json))
      )
  }
}
