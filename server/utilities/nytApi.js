var keys = require('../data/apiKeys')
var fetch = require('isomorphic-fetch');
const show = [
  'combined-print-and-e-book-fiction',
  'combined-print-and-e-book-nonfiction',
  'hardcover-fiction',
  'hardcover-nonfiction',
  'trade-fiction-paperback',
  'paperback-nonfiction',
  'advice-how-to-and-miscellaneous',
  'childrens-middle-grade-hardcover',
  'picture-books',
  'series-books',
  'young-adult-hardcover',
  'science'
]

const nytApi = {
  fetchNytCategories() {
    const url = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${keys.nyt_key}`
    return fetch(url)
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server")
        }
        return response.json()
      })
      .then(json => {
        const nytCategories = json.results
        let cats = nytCategories.map((result, key) => {
          return {
            id: 'nyt-'+key, 
            listSourceId:'NYT',
            externalId: result.list_name_encoded,
            name: result.display_name,
            visible: show.includes(result.list_name_encoded)
          }
        })
        return cats
      })
  },
  
  fetchBestSellers(externalId){
    let url = `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${keys.nyt_key}&list=${externalId}`
    return fetch(url)
      .then(response => response.json())
  }
}

module.exports = nytApi