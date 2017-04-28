const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path');
var amazon = require('amazon-product-api');
var keys = require('./utilities/apiKeys.json');

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

//Serve static content
app.use(express.static(path.resolve('..', 'build')));

//Amazon test
var client = amazon.createClient({
  awsId: keys.access_key_id,
  awsSecret: keys.secret_access_key,
  awsTag: keys.associate_tag
});

app.get('/api/amazon-categories', (req,res) => {
  client.browseNodeLookup({
    Operation: 'BrowseNodeLookup',
    BrowseNodeId: 1000, //Books -> Subjects
    responseGroup: 'BrowseNodeInfo'
  }).then(function(results){
    const amzCategories = results[0].Children[0].BrowseNode
    let cats = amzCategories.map(result => {
      return {
        Id: result.BrowseNodeId[0],
        Name: result.Name[0]
      }
    })
    res.json(cats)
  }).catch(function(err){
    console.log(results)
    res.json(err)
  });
})

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

module.exports = app
