var keys = require('../data/apiKeys')
var fetch = require('isomorphic-fetch');

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
            name: result.display_name
          }
        })
        return cats
      })
  },

  test(){
    console.log('yo im livin it up in the api')
  }
}

module.exports = nytApi