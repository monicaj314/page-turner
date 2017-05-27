const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const PageTurners = require('./lib/apiWrapper')

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

//Serve static content
app.use(express.static(path.resolve('..', 'build')));

app.get('/api/book-categories', (req,res) => {
  PageTurners.getCategories()
  .then(results => res.json(results))
  .catch(err => {
    console.error(err)
    res.status(500).json({message: err.message, stack:err.stack})
  })
})

app.get('/api/best-sellers', (req,res) => {
  const categoryId = req.query.categoryId
  if (!categoryId)
    throw new Error('Book Category is Required!')

  PageTurners.getCategory(categoryId)
    .then(category => {
      if (!category) throw new Error('Category not found!')
      return PageTurners.getBestSellers(category)
    }).then(results => {
      res.json(results)
    }).catch(err => {
      console.error(err)
      res.status(500).json({message: err.message, stack:err.stack})
    })
})

app.get('/api/raw', (req,res) => {
  const categoryId = req.query.categoryId
  if (!categoryId)
    throw new Error('Book Category is Required!')

  PageTurners.getCategory(categoryId)
    .then(category => {
      if (!category) throw new Error('Category not found!')
      return PageTurners.getBestSellers(category)
    }).then(results => {
      res.json(results)
    }).catch(err => {
      console.error(err)
      res.status(500).json(JSON.stringify(err))
    })
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({message: err.message, stack:err.stack})
})

module.exports = app
