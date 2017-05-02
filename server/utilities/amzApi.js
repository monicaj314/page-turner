var keys = require('../data/apiKeys')
const amazon = require('amazon-product-api')

let client = amazon.createClient({
    awsId: keys.amz_access_key_id,
    awsSecret: keys.amz_secret_access_key,
    awsTag: keys.amz_associate_tag
  });

const amzApi = {
  fetchAmzCategories(){
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
  },

  fetchBestSellers(externalId){
    return [
      {
        name: 'page-turners Amazon',
        author: 'Victor'
      }
    ]
  },

  fetchByIsbn(isbns){
    return client.itemLookup({
      idType:'ISBN',
      itemId: isbns.slice(0,10).join(","),
      condition:'New',
      merchantId: 'Amazon',
      searchIndex: 'Books',
      includeReviewsSummary: true,
      truncateReviewsAt: 150,
      responseGroup: 'Large,Reviews,Similarities'
    }).then(function(results){
      return results
    })
  }
}

module.exports = amzApi