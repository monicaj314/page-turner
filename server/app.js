const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const nytApi = require('./utilities/nytApi')
const amzApi = require('./utilities/amzApi')



// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

//Serve static content
app.use(express.static(path.resolve('..', 'build')));

app.get('/api/book-categories', (req,res) => {
  let nytCategories, amzCategories
  
  let nytFetch = nytApi.fetchNytCategories()
    .then(results => nytCategories = results)

  let amzFetch = amzApi.fetchAmzCategories()
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
