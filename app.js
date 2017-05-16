const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
var fetch = require('isomorphic-fetch');


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

//Serve static content
app.use(express.static(path.resolve('build')));

app.get('/api/book-categories', (req, res) => {
  let url = `http://localhost:3001/api/book-categories`
  return fetch(url)
    .then(response => response.json())
    .then(results => {
      res.json(results)
    }).catch(err => {
      console.error(err)
      res.status(500).json({message: err.message, stack:err.stack})
    })
})

app.get('/api/best-sellers', (req, res) => {
  let url = `http://localhost:3001/api/best-sellers?categoryId=${req.query.categoryId}`
  return fetch(url)
    .then(response => response.json())
    .then(results => {
      res.json(results)
    }).catch(err => {
      console.error(err)
      res.status(500).json({message: err.message, stack:err.stack})
    })
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({message: err.message, stack:err.stack})
})

app.get('*', (req, res) => {
  console.log(`path: ${path.resolve(__dirname, 'build', 'index.html')}`)
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

module.exports = app
