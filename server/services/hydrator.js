const PageTurners = require('../lib/apiWrapper')
const cache = require('../lib/cache')

const sixHours = 6*60*60*1000
const fourHours = 4*60*60*1000

setInterval(() => {
  console.log(`Hydrating Categories (Time: ${new Date()})`)
  PageTurners.fetchCategories()
    .then(data => {
      const key = 'categories'
      cache.set(key, JSON.stringify(data), 24*60*60) //24 hours
      console.log(`Time: ${new Date()} - CACHE for key '${key}' hydrated.`)
      console.log(`------------------------------------------------------------------------------`)
    })
    .catch(err => {
      console.error(err)
    })
}, sixHours)

setInterval(() => {
  console.log(`Hydrating Best Sellers (Time: ${new Date()})`)
  PageTurners.getCategories()
    .then(data => {
      const categories = data.filter(cat => cat.visible)
      for (let i = 0; i < categories.length; i++){
        setTimeout(() => {
          const category = categories[i]
          console.log(`Time: ${new Date()} - Starting '${category.name}'.`)
          PageTurners.fetchBestSellers(category)
            .then(data => {
              const key = category.id
              cache.set(key, JSON.stringify(data), 6*60*60) //6 hrs
              console.log(`Time: ${new Date()} - CACHE for key '${key}' hydrated.`)
              console.log(`------------------------------------------------------------------------------`)
            })
            .catch(err => {
              console.error(err)
            })``
        }, i * 30000)
      }
    })
}, fourHours)
