var keys = require('../data/apiKeys')
const amazon = require('amazon-product-api')

const amzApi = {
  fetchAmzCategories(){
    let client = amazon.createClient({
      awsId: keys.access_key_id,
      awsSecret: keys.secret_access_key,
      awsTag: keys.associate_tag
    });
    
    return client.browseNodeLookup({
      Operation: 'BrowseNodeLookup',
      BrowseNodeId: 1000, //Books -> Subjects
      responseGroup: 'BrowseNodeInfo'
    }).then(function(results){
      const amzCategories = results[0].Children[0].BrowseNode
      let cats = amzCategories.map(result => {
        return {
          id: 'amz-'+result.BrowseNodeId[0],
          listSourceId:'AMZ',
          externalId: result.BrowseNodeId[0],
          name: result.Name[0]
        }
      })
      return cats
    })
  } 
}

module.exports = amzApi