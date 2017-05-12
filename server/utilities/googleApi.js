var keys = require('../data/apiKeys')
var fetch = require('isomorphic-fetch');

const googleApi = {
  fetchBook(isbn){
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${keys.google_key}`

    return fetch(url)
      .then(response => response.json())
  }

}

module.exports = googleApi
