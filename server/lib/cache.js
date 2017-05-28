const redis = require('redis')
const redisClient = redis.createClient()

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

module.exports = {
  getBestSellersFromCache,
  fetchCategoriesFromCache,
  set
}