const keys = require('../data/apiKeys')
const fetch = require('isomorphic-fetch')
const {parseString} = require('xml2js')

const goodreadsApi = {
  fetchBook(isbn){
    const url = `https://www.goodreads.com/book/isbn/${isbn}?key=${keys.gr_key}`
    console.log('FETCHING: '+url)
    return fetch(url)
      .then(response => response.text())
      .then(text => {
        let parsedResults
        parseString(text, (err, result) => {
          parsedResults = result
        })
        return parsedResults
      })
  },

  fetchReviewCounts(isbnArray){
    const isbns = isbnArray.join(",")
    const url = `https://www.goodreads.com/book/review_counts.json?isbns=${isbns}&key=${keys.gr_key}`
    console.log('FETCHING: '+url)
    return fetch(url)
      .then(response => response.json())
  }

}

module.exports = goodreadsApi
