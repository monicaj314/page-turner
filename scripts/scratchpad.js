var amazon = require('amazon-product-api');
var keys = require('../src/utilities/apiKeys.json');

var client = amazon.createClient({
  awsId: keys.access_key_id,
  awsSecret: keys.secret_access_key,
  awsTag: keys.associate_tag
});

function fetchAmazonBookInfo(){
  client.itemSearch({
    director: 'Quentin Tarantino',
    actor: 'Samuel L. Jackson',
    searchIndex: 'DVD',
    audienceRating: 'R',
    responseGroup: 'ItemAttributes,Offers,Images'
  }).then(function(results){
    console.log(results);
  }).catch(function(err){
    console.log(err);
  });
}

fetchAmazonBookInfo()
