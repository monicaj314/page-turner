const nytApi = require('../api/nytApi')
const amazonApi = require('../api/amazonApi')
const goodreadsApi = require('../api/goodreadsApi')
const googleApi = require('../api/googleApi')
const Book = require('../models/Book')
const cache = require('./cache')


function fetchBestSellers(category){
  switch (category.listSourceId){
    case 'AMZ':
      return fetchAmazonBooksAndReturnModels(category)
        .then(ptBooks => fetchGoodreadsReviewCountsAndMerge(ptBooks))
        .then(ptBooks => fetchGoogleBookAndMerge(ptBooks))

      case 'NYT':
      return fetchNytBooksAndReturnModels(category)
        .then(ptBooks => fetchAmzBooksAndMerge(ptBooks))
        .then(ptBooks => fetchGoodreadsReviewCountsAndMerge(ptBooks))
        .then(ptBooks => fetchGoogleBookAndMerge(ptBooks))

    default:
      throw new Error('Uh oh, listSource not found!')
  }
}

function getBestSellers(category){
  return cache.getBestSellersFromCache(category)
    .then(data => {
      if (data){
        console.log(`Found best sellers in CACHE for key:${category.id}, name:${category.name}`)
        return data
      } else {
        return fetchBestSellers(category)
          .then(data => {
            cache.set(category.id, JSON.stringify(data), 21600) //6 hrs
            console.log(`Fetching best sellers from APIs.  CACHE hydrated for key:${category.id}, name:${category.name}`)
            return data
          })
      }
    })
}

function getCategories(){
  return cache.fetchCategoriesFromCache()
    .then(data => {
      if (data){
        console.log('Found categories in CACHE')
        return data
      } else {
        return fetchCategories()
          .then(data => {
            cache.set('categories', JSON.stringify(data), 604800)
            console.log('Fetching categories from API.  CACHE hydrated.')
            return data
          })
      }
    })
}

function getCategory(categoryId){
  return getCategories()
    .then(categories => categories.find(cat => cat.id === categoryId))
}





function fetchAmazonBooksAndReturnModels(category){
  return amazonApi.fetchBestSellers(category.externalId)
    .then(results => {
      const bestSellers = results[0]["TopSellers"][0].TopSeller
      let asins = []
      bestSellers.map(amazonBestSeller => asins.push(amazonBestSeller["ASIN"][0]))
      return amazonApi.fetchByIsbn("ASIN", asins)
    })
    .then(amzBooks => {
      let books = []
      amzBooks.map((amzBook,i) => {
        let book = new Book()
        book.parseAmazonBook(amzBook, i+1)
        books.push(book)
      })
      return books;
    })
}

function fetchGoodreadsReviewCountsAndMerge(ptBooks){
  let isbns = []
  ptBooks.map(book => {
    if (book.isbn13){
      isbns.push(book.isbn13)
    } else if (book.isbn10){
      isbns.push(book.isbn10)
    }
  })
  return goodreadsApi.fetchReviewCounts(isbns)
    .then(reviewCounts => {
      if (!reviewCounts){
        return ptBooks
      }

      ptBooks.map(book => {
        let matchedReview = reviewCounts.books.find(review => {
          return (review.isbn === book.isbn10) || (review.isbn13 === book.isbn13)
        })
        if (matchedReview){
          book.parseGoodReadsReviewCounts(matchedReview)
        }
      })

      return ptBooks
    })
}

function fetchGoogleBookAndMerge(ptBooks){
  var googlePromises = ptBooks.map(ptBook => {
    return googleApi.searchForBook(ptBook.authors ? ptBook.authors[0] : null, ptBook.amzTitle)
      .then(googleBook => {
        ptBook.parseGoogleBook(googleBook)
        return ptBook
      })
  })
  return Promise.all(googlePromises)
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

  return amazonApi.fetchByIsbn(idType, itemIds)
    .then(amzBooks => mergeAmzBooks(amzBooks, ptBooks))
    .catch(error => {
      const regex = /([A-Za-z0-9]+)\s+is not a valid value for ItemId/g
      let match = regex.exec(error.message);
      let badItemIds = new Set()
      while (match != null) {
        badItemIds.add(match[1])
        match = regex.exec(error.message);
      }

      if (badItemIds.size > 0) {
        const goodItemIds = new Set(itemIds.filter(itemId => !badItemIds.has(itemId)))
        return amazonApi.fetchByIsbn(idType, Array.from(goodItemIds))
          .then(amzBooks => mergeAmzBooks(amzBooks, ptBooks))
          .then(ptBooks => {
            const booksToFetchByTitle = ptBooks.filter(book => badItemIds.has(book.isbn13))
            const amazonPromises = booksToFetchByTitle.map((book, i) => {
                return amazonApi.fetchByTitle(book.authors[0], book.nytTitle)
                .then(amzBook => {
                  book.parseAmazonBook(amzBook[0], book.rank)
                })
            })
            return Promise.all(amazonPromises).then(() => {
              return ptBooks
            })
          })
      }
      throw error
    })
}

function mergeAmzBooks(amzBooks, ptBooks){
  ptBooks.map(book => {
    let matched = amzBooks.find(amzBook => {
      if (amzBook.ItemAttributes[0].EAN){
        const amazonIsbn = amzBook.ItemAttributes[0].EAN[0]
        return amzBook.ItemAttributes[0].EAN[0] === book.isbn13
      }
      else if (amzBook.ItemAttributes[0].EISBN){
        const amazonIsbn = amzBook.ItemAttributes[0].EISBN[0]
        return (amazonIsbn === book.isbn13) || (amazonIsbn === book.isbn10)
      }
      else if (amzBook.ItemAttributes[0].ISBN){
        const amazonIsbn = amzBook.ItemAttributes[0].ISBN[0]
        return (amazonIsbn === book.isbn13) || (amazonIsbn === book.isbn10)
      }
    })

    if (matched) {
      book.parseAmazonBook(matched)
    }
  })
  return ptBooks
}

function fetchNytBooksAndReturnModels(category){
  return nytApi.fetchBestSellers(category.externalId)
    .then(json => {
      let nytBestSellers = json.results.slice(0,10)
      let books = []
      nytBestSellers.map(nytBook => {
        let book = new Book()
        book.parseNewYorkTimesBook(nytBook)
        books.push(book)        
      })
      return books
    })
}

//---------------------

function fetchCategories(){
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


module.exports = {
  getCategories,
  getCategory,
  getBestSellers,
  //---
  fetchCategories,
  fetchBestSellers
}