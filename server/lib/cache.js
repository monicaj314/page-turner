const redis = require('redis')
const redisClient = redis.createClient()

const twentySixHours = 26*60*60
const twelveHours = 12*60*60

function getBestSellersFromCache(category){
  return new Promise((resolve, reject) => {
    redisClient.get(category.id, function (err, data) {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
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

function set(key, value, expS){
  redisClient.set(key, value, 'EX', expS);
}

function setCategories(key = 'categories', value, expS = twentySixHours){
  redisClient.set(key, value, 'EX', expS)
  console.log(`Time: ${new Date()} - CACHE for key '${key}' hydrated. Expires in ${expS} s`)
}

function setBestSellers(key, value, expS = twelveHours){
  redisClient.set(key, value, 'EX', expS)
  console.log(`Time: ${new Date()} - CACHE for key '${key}' hydrated. Expires in ${expS} s`)
}

module.exports = {
  getBestSellersFromCache,
  fetchCategoriesFromCache,
  setCategories,
  setBestSellers
}