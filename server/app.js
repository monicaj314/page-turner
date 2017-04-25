const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path');
var amazon = require('amazon-product-api');
var keys = require('./utilities/apiKeys.json');

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

//Serve static content
console.log(path.resolve('..', 'public'))
app.use(express.static(path.resolve('..', 'build')));

//Amazon test
var client = amazon.createClient({
  awsId: keys.access_key_id,
  awsSecret: keys.secret_access_key,
  awsTag: keys.associate_tag
});

app.get('/api/amazon', (req, res) => {
  client.itemSearch({
    director: 'Quentin Tarantino',
    actor: 'Samuel L. Jackson',
    searchIndex: 'DVD',
    audienceRating: 'R',
    responseGroup: 'ItemAttributes,Images'
  }).then(function(results){
    res.json(results)
  }).catch(function(err){
    console.log(err);
  });

})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app
