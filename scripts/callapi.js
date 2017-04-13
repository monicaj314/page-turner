var fetch = require('isomorphic-fetch')

let apiKey = 'c0b2ce3bdb324451871bcd8ccfe7c0eb'
let listName = 'Education'

let url = `https://api.nytimes.com/svc/books/v3/lists.json?api-key=${apiKey}&list=${listName}`
console.log(url)
//https://api.nytimes.com/svc/books/v3/lists.json?api-key=c0b2ce3bdb324451871bcd8ccfe7c0eb&list=Hardcover Nonfiction



fetch(url)
  .then(response => response.json())
  .then(json => console.log(json))
