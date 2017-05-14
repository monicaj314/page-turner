var keys = require('../data/apiKeys')
var fetch = require('isomorphic-fetch');

const googleApi = {
  fetchBook(isbn){
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(isbn)}&key=${encodeURIComponent(keys.google_key)}`
    //const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(isbn)}`
    console.log('API: ' + url)
    return fetch(url)
      .then(response => response.json())
  },
  searchForBook(author, title){
    let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}&key=${keys.google_key}`
    //let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`

    if (!author){
      //url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}&key=${keys.google_key}`
      url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`
    }

    console.log('API: ' + url)
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        //console.log(json)
        return json
      })
      // .catch(error => {
      //   console.error('ERROR!: '+error)
      //   console.error('Url that broke: '+url)
      // })

  }

}

module.exports = googleApi
