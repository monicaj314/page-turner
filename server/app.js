const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
var amazon = require('amazon-product-api')
var keys = require('./utilities/apiKeys.json')
var fetch = require('isomorphic-fetch');
var request = require('request')

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

//Serve static content
app.use(express.static(path.resolve('..', 'build')));

app.get('/api/book-categories', (req,res) => {
  let nytCategories, amzCategories
  
  let nytFetch = fetchNytCategories()
    .then(results => nytCategories = results)

  let amzFetch = fetchAmzCategories()
    .then(results => amzCategories = results)

  Promise.all([nytFetch, amzFetch])
    .then(() => {
      const results = nytCategories.concat(amzCategories)
      res.json(results)
    }).catch((err) => {
      console.error(err)
      res.status(500).send(err.message)
    })

})

function fetchNytCategories(){
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
}

function fetchAmzCategories(){
  let client = amazon.createClient({
    awsId: keys.access_key_id,
    awsSecret: keys.secret_access_key,
    awsTag: keys.associate_tag
  });
  
  return client.browseNodeLookup({
    Operation: 'BrowseNodeLookup',
    BrowseNodeId: 1000, //Books -> Subjects
    responseGroup: 'BrowseNodeInfo'
  }).then(function(results){
    const amzCategories = results[0].Children[0].BrowseNode
    let cats = amzCategories.map(result => {
      return {
        id: 'amz-'+result.BrowseNodeId[0],
        listSourceId:'AMZ',
        externalId: result.BrowseNodeId[0],
        name: result.Name[0]
      }
    })
    return cats
  })
}

app.get('/api/book-categories-test', (req,res) => {
    console.warn('Static Category Data!')
    var cats = require('./data/categories')
    res.json(cats)
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

module.exports = app
