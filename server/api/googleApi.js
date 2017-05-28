var keys = require('../data/apiKeys')
var fetch = require('isomorphic-fetch');

const googleApi = {
  fetchBook(isbn){
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(isbn)}&key=${encodeURIComponent(keys.google_key)}`
    console.log('GOOGLE API: ' + url)
    return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.error(`Google Error: ${error}`)
        throw error
      })
  },

  searchForBook(author, title){
    let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}&key=${keys.google_key}`
    
    if (!author){
      url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&key=${keys.google_key}`
    }

    console.log('GOOGLE API: ' + url)
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        return json
      })
      .catch(error => {
        console.error(`Google Error: ${error}`)
        throw error
      })
  }

}

module.exports = googleApi
