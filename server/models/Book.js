class Book {
  constructor(){
    this.ratings = {}
    this.reviews = []
    this.authors = []
  }

  parseNewYorkTimesBook(nytBook){
    const nytBookDetails = nytBook.book_details[0]
    //match ASIN number after /dp/xxxxx?
    const regex = /\/dp\/([a-zA-Z0-9]*)/i
    const url = nytBook.amazon_product_url
    const regexMatches = url.match(regex)
    if (regexMatches && regexMatches[1]){
      var amazonAsin = regexMatches[1]
    }
    
    this.authors.push(nytBookDetails.author)
    this.nytAmazonAsin = amazonAsin
    this.nytTitle = nytBookDetails.title
    this.isbn13 = nytBookDetails.primary_isbn13
    this.isbn10 = nytBookDetails.primary_isbn10
    this.nytDescription = nytBookDetails.description
    this.rank = nytBook.rank
    this.weeksOnList = nytBook.weeks_on_list
    this.nytAmazonLink = nytBook.amazon_product_url
    this.ratings = {
      nyt:null,
      amazon:null,
      goodreads:null,
      google:null
    },
    this.reviews = [{
      source:'New York Times',
      type:'editorial',
      isLink:'true',
      content: nytBook.reviews[0].book_review_link,
      contentTitle: 'New York Times Book Review'
    },{
      source:'New York Times',
      type:'editorial',
      isLink:'true',
      content: nytBook.reviews[0].sunday_review_link,
      contentTitle: 'New York Times Sunday Book Review'
    }]
  }

  parseGoogleBook(googleBook){
    if (googleBook.items && googleBook.items[0]){
      this.ratings.google = {
        averageRating: googleBook.items[0].volumeInfo.averageRating ? googleBook.items[0].volumeInfo.averageRating.toFixed(2) : undefined,
        ratingsCount: googleBook.items[0].volumeInfo.ratingsCount
      }
      this.googlePreviewLink = googleBook.items[0].volumeInfo.previewLink
      if (googleBook.items[0].volumeInfo.imageLinks){
        this.googleSmallThumbnail = googleBook.items[0].volumeInfo.imageLinks.smallThumbnail
        this.googleMediumThumbnail = googleBook.items[0].volumeInfo.imageLinks.smallThumbnail
      }
    }
  }

  parseAmazonBook(amzBook, rank){       
    if (rank){
      this.rank = rank
    }

    if (amzBook.ItemAttributes[0].ISBN){
      this.amzIsbn = amzBook.ItemAttributes[0].ISBN[0]
      this.isbn10 = amzBook.ItemAttributes[0].ISBN[0] 
    }

    if (amzBook.ItemAttributes[0].EISBN){
      this.amzIsbn = amzBook.ItemAttributes[0].EISBN[0]
      this.isbn13= amzBook.ItemAttributes[0].EISBN[0] 
    }

    if (amzBook.ItemAttributes[0].EAN){
      this.amzIsbn = amzBook.ItemAttributes[0].EAN[0]
      this.isbn13= amzBook.ItemAttributes[0].EAN[0]
    }

    this.amzAsin = amzBook.ASIN[0]
    this.amzTitle = amzBook.ItemAttributes[0].Title[0]
    this.authors = amzBook.ItemAttributes[0].Author
    this.numOfPages = amzBook.ItemAttributes[0].NumberOfPages ? amzBook.ItemAttributes[0].NumberOfPages[0] : null
    this.publicationDate = amzBook.ItemAttributes[0].PublicationDate ? amzBook.ItemAttributes[0].PublicationDate[0] : null
    this.amazonLink = amzBook.DetailPageURL[0]

    if (amzBook.ItemAttributes[0].Binding){
      this.binding = amzBook.ItemAttributes[0].Binding[0] 
    }

    if (amzBook.CustomerReviews){
      amzBook.CustomerReviews.map(review => {
        this.reviews.push({
          source: 'Amazon',
          type: 'customer',
          isLink: true,
          content: review.IFrameURL[0],
          contentTitle: 'Amazon Customer Reviews'
        })
      })
    }

    if (amzBook.EditorialReviews){
      this.amzDescription = null

      amzBook.EditorialReviews.map(review => {
        if (review.EditorialReview[0].Source[0] === 'Product Description'){
          this.amzDescription = review.EditorialReview[0].Content[0]
        } else {
          this.reviews.push({
            source: 'Amazon',
            type: 'editorial',
            isLink: false,
            contentTitle: review.EditorialReview[0].Source[0],
            content: review.EditorialReview[0].Content[0],
          })
        }
      })
    }

    if (amzBook.SmallImage){
      this.smallImage = amzBook.SmallImage[0].URL[0]
    }
    if (amzBook.MediumImage){
      this.mediumImage = amzBook.MediumImage[0].URL[0]
    }
    if (amzBook.LargeImage){
      this.largeImage = amzBook.LargeImage[0].URL[0]
    }
  }

  parseGoodReadsReviewCounts(goodReadsReview){
    this.goodreadsId = goodReadsReview.id
    this.ratings.goodreads = {
      averageRating: goodReadsReview.average_rating,
      ratingsCount: goodReadsReview.work_ratings_count
    }
  }
}

module.exports = Book