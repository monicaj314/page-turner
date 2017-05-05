const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const nytApi = require('./utilities/nytApi')
const amazonApi = require('./utilities/amazonApi')
const goodreadsApi = require('./utilities/goodreadsApi')

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

app.get('/api/raw', (req,res) => {
  const categoryId = req.query.categoryId
  if (!categoryId)
    throw new Error('Book Category is Required!')

  getCategory(categoryId)
    .then(category => {
      if (!category) throw new Error('Category not found!')
      return fetchBestSellers(category)  //TWO!!!
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

    let amzFetch = amazonApi.fetchAmzCategories()
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
function fetchAmazonBooksIsbn(idType, itemIds){
  return fetchAmazonBooksIsbnFromCache(itemIds)
    .then(data => {
      if (data){
        console.log('Fetching Amazon ISBN books from CACHE')
        return data
      } else {
        return amazonApi.fetchByIsbn(idType, itemIds)
          .then(data => {
            redisClient.set(itemIds.join(','), JSON.stringify(data));
            console.log('Fetching Amazon ISBN books from API.  CACHE hydrated.')
            return data
          })
      }
    })
}

function fetchAmazonBooksIsbnFromCache(isbns){
  return new Promise((resolve, reject) => {
    redisClient.get(isbns.join(','), function (err, data) {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })
}

function fetchAmazonBooksAndReturnModelsTEST(category){
return amazonApi.fetchBestSellers(category.externalId)
    .then(results => {
      const bestSellers = results[0]["TopSellers"][0].TopSeller
      let asins = []
      bestSellers.map(amazonBestSeller => asins.push(amazonBestSeller["ASIN"][0]))
      return fetchAmazonBooksIsbn("ASIN", ["B01D24NAL6"])
    })
}

function fetchAmazonBooksAndReturnModels(category){
  return amazonApi.fetchBestSellers(category.externalId)
    .then(results => {
      const bestSellers = results[0]["TopSellers"][0].TopSeller
      let asins = []
      bestSellers.map(amazonBestSeller => asins.push(amazonBestSeller["ASIN"][0]))
      return fetchAmazonBooksIsbn("ASIN", asins)
    })
    .then(amzBooks => {
      let books = []
      amzBooks.map((amzBook,i) => {
        let book = {
          reviews:{
            amz: {
              customerReviews:[],
              editorialReviews:[]
            }
          }
        }
        book.rank = i

        //EXTRACT & REFACTOR
        if (amzBook.ItemAttributes[0].ISBN){
          book.amzIsbn = amzBook.ItemAttributes[0].ISBN[0]
          book.isbn10 = amzBook.ItemAttributes[0].ISBN[0] //added
        }
        if (amzBook.ItemAttributes[0].EAN){
          book.amzIsbn = amzBook.ItemAttributes[0].EAN[0]
          book.isbn13= amzBook.ItemAttributes[0].EAN[0] //added
        }
        if (amzBook.ItemAttributes[0].EISBN){
          book.amzIsbn = amzBook.ItemAttributes[0].EISBN[0]
          book.isbn13= amzBook.ItemAttributes[0].EISBN[0] //added
        }
        
        
        book.amzAsin = amzBook.ASIN[0]
        book.amzTitle = amzBook.ItemAttributes[0].Title[0]
        book.authors = amzBook.ItemAttributes[0].Author
        book.numOfPages = amzBook.ItemAttributes[0].NumberOfPages ? amzBook.ItemAttributes[0].NumberOfPages[0] : null
        book.publicationDate = amzBook.ItemAttributes[0].PublicationDate[0]
        book.amazonLink = amzBook.DetailPageURL[0]

        if (amzBook.CustomerReviews){
          amzBook.CustomerReviews.map(review => {
            book.reviews.amz.customerReviews.push({
              hasReviews: review.HasReviews,
              iframeUrl: review.IFrameURL[0]
            })
          })
        }
        
        if (amzBook.EditorialReviews){
          book.amzDescription = null

          amzBook.EditorialReviews.map(review => {
            if (review.EditorialReview[0].Source[0] === 'Product Description'){
              book.amzDescription = review.EditorialReview[0].Content[0]
            } else {
              book.reviews.amz.editorialReviews.push({
                source: review.EditorialReview[0].Source[0],
                content: review.EditorialReview[0].Content[0],
              })
            }
          })
        }

        if (amzBook.SmallImage){
          book.smallImage = amzBook.SmallImage[0].URL[0]
        }
        if (amzBook.MediumImage){
          book.mediumImage = amzBook.MediumImage[0].URL[0]
        }
        if (amzBook.LargeImage){
          book.largeImage = amzBook.LargeImage[0].URL[0]
        }
        //END EXTRACT & REFACTOR

        books.push(book)
        
      })
      return books;
    })
}

function fetchBestSellers(category){
  switch (category.listSourceId){
    case 'AMZ':
      return fetchAmazonBooksAndReturnModels(category)
        //.then(ptBooks => fetchGoodreadsReviewCountsAndMerge(ptBooks))

      case 'NYT':
      return fetchNytBooksAndReturnModels(category)
        .then(ptBooks => fetchAmzBooksAndMerge(ptBooks))
        .then(ptBooks => fetchGoodreadsReviewCountsAndMerge(ptBooks))

    default:
      throw new Error('Uh oh, listSource not found!')
  }
}

function fetchGoodreadsReviewCountsAndMerge(ptBooks){
  let isbn13s = []
  ptBooks.map(book => {isbn13s.push(book.isbn13)})
  return goodreadsApi.fetchReviewCounts(isbn13s)
    .then(reviewCounts => {
      ptBooks.map(book => {
        let matchedReview = reviewCounts.books.find(review => {
          return (review.isbn === book.isbn10) || (review.isbn13 === book.isbn13)
        })
        book.goodreadsId = matchedReview.id
        book.reviews.goodreads = {
          averageRating: matchedReview.average_rating,
          ratingsCount: matchedReview.work_ratings_count
        }
      })
      return ptBooks
    })
}

function fetchAmzBooksAndMerge(ptBooks){
  let amazonAsins = []
  let isbn13s = []
  ptBooks.map(book => {
    if (book.nytAmazonAsin){
      amazonAsins.push(book.nytAmazonAsin)
    }
    isbn13s.push(book.isbn13)
  })

  let idType = 'ISBN'
  let itemIds = isbn13s
  if (amazonAsins.length === 10 && false){
    idType = 'ASIN'
    itemIds = amazonAsins
  }
  
  return fetchAmazonBooksIsbn(idType, itemIds)
    .then(amzBooks => mergeAmzBooks(amzBooks, ptBooks))
}

function mergeAmzBooks(amzBooks, ptBooks){
  ptBooks.map(book => {
    let matched = amzBooks.find(amzBook => {
      if (amzBook.ItemAttributes[0].ISBN){
        const amazonIsbn = amzBook.ItemAttributes[0].ISBN[0]
        return (amazonIsbn === book.isbn13) || (amazonIsbn === book.isbn10)
      }
      else if (amzBook.ItemAttributes[0].EISBN){
        const amazonIsbn = amzBook.ItemAttributes[0].EISBN[0]
        return (amazonIsbn === book.isbn13) || (amazonIsbn === book.isbn10)
      }
      else if (amzBook.ItemAttributes[0].EAN){
        const amazonIsbn = amzBook.ItemAttributes[0].EAN[0]
        return amzBook.ItemAttributes[0].EAN[0] === book.isbn13
      }
    })

    if (matched) {
      if (matched.ItemAttributes[0].ISBN){
        book.amzIsbn = matched.ItemAttributes[0].ISBN[0]
      }
      else if (matched.ItemAttributes[0].EISBN){
        book.amzIsbn = matched.ItemAttributes[0].EISBN[0]
      }
      else if (matched.ItemAttributes[0].EAN){
        book.amzIsbn = matched.ItemAttributes[0].EAN[0]
      }
      
      book.amzAsin = matched.ASIN[0]
      book.amzTitle = matched.ItemAttributes[0].Title[0]
      book.authors = matched.ItemAttributes[0].Author
      book.numOfPages = matched.ItemAttributes[0].NumberOfPages ? matched.ItemAttributes[0].NumberOfPages[0] : null
      book.publicationDate = matched.ItemAttributes[0].PublicationDate[0]
      book.amazonLink = matched.DetailPageURL[0]

      if (matched.CustomerReviews){
        matched.CustomerReviews.map(review => {
          book.reviews.amz.customerReviews.push({
            hasReviews: review.HasReviews,
            iframeUrl: review.IFrameURL[0]
          })
        })
      }
      
      if (matched.EditorialReviews){
        book.amzDescription = null

        matched.EditorialReviews.map(review => {
          if (review.EditorialReview[0].Source[0] === 'Product Description'){
            book.amzDescription = review.EditorialReview[0].Content[0]
          } else {
            book.reviews.amz.editorialReviews.push({
              source: review.EditorialReview[0].Source[0],
              content: review.EditorialReview[0].Content[0],
            })
          }
        })
      }

      if (matched.SmallImage){
        book.smallImage = matched.SmallImage[0].URL[0]
      }
      if (matched.MediumImage){
        book.mediumImage = matched.MediumImage[0].URL[0]
      }
      if (matched.LargeImage){
        book.largeImage = matched.LargeImage[0].URL[0]
      }
    } //if matched
  })
  return ptBooks
}

function fetchNytBooksAndReturnModels(category){
  return nytApi.fetchBestSellers(category.externalId)
    .then(json => {
      let nytBestSellers = json.results.slice(0,10)
      let books = []
      nytBestSellers.map(nytBook => {
        const nytBookDetails = nytBook.book_details[0]
        //match ASIN number after /dp/xxxxx? 
        const regex = /\/dp\/([a-zA-Z0-9]*)/i
        const url = nytBook.amazon_product_url
        const regexMatches = url.match(regex)
        if (regexMatches && regexMatches[1]){
          var amazonAsin = regexMatches[1]
        }
        books.push({
          nytAmazonAsin: amazonAsin,
          nytTitle: nytBookDetails.title,
          isbn13: nytBookDetails.primary_isbn13,
          isbn10: nytBookDetails.primary_isbn10,
          nytDescription: nytBookDetails.description,
          rank: nytBook.rank,
          weeksOnList: nytBook.weeks_on_list,
          reviews: {
            nyt: {
              editorialReviews: nytBook.reviews,
              customerReviews: []
            },
            amz:{
              editorialReviews: [],
              customerReviews: []
            }
          }
        })
      })
      return books
    })
}

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({message: err.message, stack:err.stack})
})

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

module.exports = app
