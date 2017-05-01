const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const nytApi = require('./utilities/nytApi')
const amzApi = require('./utilities/amzApi')

const redis = require('redis')
const redisClient = redis.createClient()


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

//Serve static content
app.use(express.static(path.resolve('..', 'build')));

app.get('/api/book-categories', (req,res) => {
  fetchCategories()
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
  
  getCategory(categoryId)
    .then(category => {
      if (!category) throw new Error('Category not found!')
      return fetchBestSellers(category)
    }).then(results => {
      res.json(results)
    }).catch(err => {
      console.error(err)
      res.status(500).json(JSON.stringify(err))
    })
})

function fetchCategories(){
  return fetchCategoriesFromCache()
    .then(data => {
      if (data){
        console.log('Fetching categories from CACHE')
        return data
      } else {
        return fetchCategoriesFromApis()
          .then(data => {
            redisClient.set('categories', JSON.stringify(data), 'EX', 3600);
            console.log('Fetching categories from API.  CACHE hydrated.')
            return data
          })
      }
    })
}

function getCategory(categoryId){
  return fetchCategories()
    .then(categories => categories.find(cat => cat.id === categoryId))
}

function fetchCategoriesFromApis(){
  return new Promise((resolve, reject) => {
    let nytCategories, amzCategories

    let nytFetch = nytApi.fetchNytCategories()
      .then(results => nytCategories = results)

    let amzFetch = amzApi.fetchAmzCategories()
      .then(results => amzCategories = results)

    Promise.all([nytFetch, amzFetch])
      .then(() => {
        const results = nytCategories.concat(amzCategories)
        resolve(results)
      }).catch(err => reject(err))
  })
}

function fetchCategoriesFromCache() {
  return new Promise((resolve, reject) => {
    redisClient.get('categories', function (err, data) {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })
}

//DEV USE ONLY
function fetchAmazonBooksIsbn(isbns){
  return fetchAmazonBooksIsbnFromCache()
    .then(data => {
      if (data){
        console.log('Fetching Amazon ISBN books from CACHE')
        return data
      } else {
        return amzApi.fetchByIsbn(isbns)
          .then(data => {
            redisClient.set('amazonIsbnBooks', JSON.stringify(data), 'EX', 3600);
            console.log('Fetching Amazon ISBN books from API.  CACHE hydrated.')
            return data
          })
      }
    })
}

function fetchAmazonBooksIsbnFromCache(){
  return new Promise((resolve, reject) => {
    redisClient.get('amazonIsbnBooks', function (err, data) {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })
}

function fetchBestSellers(category){
  switch (category.listSourceId){
    case 'AMZ':
      return amzApi.fetchBestSellers(category.externalId)
      break;
    case 'NYT':
      let collection = { books:[], isbn13s:[] }
      return nytApi.fetchBestSellers(category.externalId)
        .then(json => {
          let nytBestSellers = json.results.slice(0,10)
          nytBestSellers.map(nytBook => {
            const nytBookDetails = nytBook.book_details[0]
            collection.isbn13s.push(nytBookDetails.primary_isbn13)
            collection.books.push({
               nytTitle: nytBookDetails.title,
               isbn13: nytBookDetails.primary_isbn13,
               isbn10: nytBookDetails.primary_isbn10
             })
           })
           return collection
        }).then(collection => {
          //return amzApi.fetchByIsbn(collection.isbn13s)
          return fetchAmazonBooksIsbn(collection.isbn13s)
        })
        .then(amzBooks => {
          collection.books.map(book => {
            let found = amzBooks.find(amzBook => {
              if (amzBook.ItemAttributes[0].ISBN){
                return (amzBook.ItemAttributes[0].ISBN[0] === book.isbn13) || (amzBook.ItemAttributes[0].ISBN[0] === book.isbn10)
              }
              else if (amzBook.ItemAttributes[0].EISBN){
                return amzBook.ItemAttributes[0].EISBN[0] === book.isbn13
              }
              else if (amzBook.ItemAttributes[0].EAN){
                return amzBook.ItemAttributes[0].EAN[0] === book.isbn13
              }
            })

            if (!found){
              console.log(book)
              throw new Error('Didnt find it for '+book)
            }

            
            let isbn
            if (found.ItemAttributes[0].ISBN){
              isbn = found.ItemAttributes[0].ISBN[0]
            }
            else if (found.ItemAttributes[0].EISBN){
              isbn = found.ItemAttributes[0].EISBN[0]
            }
            else if (found.ItemAttributes[0].EAN){
              isbn = found.ItemAttributes[0].EAN[0]
            }
            
            book.amzTitle = found.ItemAttributes[0].Title[0]
            book.amzIsbn = isbn
          })


          return collection.books

        })
      break;
    default:
      throw new Error('Uh oh, listSource not found!')
  }
}





app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({message: err.message, stack:err.stack})
})

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

module.exports = app
