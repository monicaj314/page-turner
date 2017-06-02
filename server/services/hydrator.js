const PageTurners = require('../lib/apiWrapper')
const cache = require('../lib/cache')
const twelveHours = 12*60*60*1000
const twentyFourHours = 24*60*60*1000

const input = process.argv[2]

if (input === '-b') {
  hydrateBooks()
} else if (input === '-c') {
  hydrateCategories()
} else if (input === '-i') {
  console.log(`Hydrating and setting up interval for: Categories(${twentyFourHours} s), Books(${twelveHours} s)`)
  console.log(`------------------------------------------------------------------------------`)
  hydrateCategories().then(hydrateBooks)
  setInterval(hydrateCategories, twentyFourHours)
  setInterval(hydrateBooks, twelveHours)
} else {
  hydrateCategories().then(hydrateBooks)
}

function hydrateCategories(){
  console.log(`Hydrating Categories (Time: ${new Date()})`)
  return PageTurners.fetchCategories()
    .then(data => {
      const key = 'categories'
      cache.setCategories(key, JSON.stringify(data))
      console.log(`------------------------------------------------------------------------------`)
    })
    .catch(err => {
      console.error(err)
    })
}

function hydrateBooks(){
  console.log(`Hydrating Best Sellers (Time: ${new Date()})`)
  return PageTurners.getCategories()
    .then(allCategories => hydrateBestSellersForCategories(allCategories.filter(cat => cat.visible)))
}

function hydrateBestSellersForCategories(categories) {
  for (let i = 0; i < categories.length; i++){
    setTimeout(() => {
      const category = categories[i]
      console.log(`Time: ${new Date()} - Starting '${category.name}'.`)
      hydrateSingleCategory(category)
    }, i * 10000)
  }
}

function hydrateSingleCategory(category){
  PageTurners.fetchBestSellers(category)
  .then(data => {
    const key = category.id
    cache.setBestSellers(key, JSON.stringify(data))
    console.log(`------------------------------------------------------------------------------`)
  })
  .catch(err => {
    console.error(`Hydrator error:${err}`)
  })
}