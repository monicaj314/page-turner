const keys = require('../data/apiKeys')
const fetch = require('isomorphic-fetch')
const {parseString} = require('xml2js')

const goodreadsApi = {
  fetchBook(isbn){
    const url = `https://www.goodreads.com/book/isbn/${isbn}?key=${keys.gr_key}`
    console.log('GOOD READS API: '+url)
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
    console.log('GOOD READS API: '+url)
    return fetch(url)
      .then(response => {
        if (response.ok){
          return response.json()
        } else if (response.status === 404){
          return response.text()
        } else {
          throw new Error(`Error fetching GoodReads review counts: ${response.status} - ${response.statusText}`)
        }
      })
      .then(result => {
        if (result === 'No books match those ISBNs.'){
          console.warn(`Goodreads: ${result}`)
          return null
        }
        return result
      })
  }

}

module.exports = goodreadsApi
