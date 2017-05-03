const keys = require('../data/apiKeys')
const fetch = require('isomorphic-fetch')
const {parseString} = require('xml2js')

const grApi = {
  fetchBook(isbn){
    const url = `https://www.goodreads.com/book/isbn/${isbn}?key=${keys.gr_key}`
    return fetch(url)
      .then(response => {
        return response.text()
      }).then(text => {
        let parsedResults
        parseString(text, (err, result) => {
          parsedResults = result
        })
        return parsedResults
      })
  }
}

module.exports = grApi