var keys = require('../data/apiKeys')
const amazon = require('amazon-product-api')



let client = amazon.createClient({
    awsId: keys.amz_access_key_id,
    awsSecret: keys.amz_secret_access_key,
    awsTag: keys.amz_associate_tag
  });

const amazonApi = {
  fetchAmzCategories(){
    console.log('API: Amazon BrowseNodeLookup: BrowseNodeId: 1000 (Books)' )
    return client.browseNodeLookup({
      Operation: 'BrowseNodeLookup',
      BrowseNodeId: 1000, //Books -> Subjects
      responseGroup: 'BrowseNodeInfo'
    }).then(function(results){
      const amzCategories = results[0].Children[0].BrowseNode
      let cats = amzCategories.map(result => {
        return {
          id: 'amz-'+result.BrowseNodeId[0],
          listSourceId: 'AMZ',
          listSource: 'Amazon',
          externalId: result.BrowseNodeId[0],
          name: result.Name[0],
          visible: true
        }
      })
      return cats
    })
  },

  fetchBestSellers(externalId){
    console.log(`API: Amazon TopSellers for BrowseNodeId: ${externalId}` )
    return client.browseNodeLookup({
      BrowseNodeId: externalId,
      responseGroup: 'TopSellers',
      searchIndex: 'Books',
    }).then(function(results){
      return results
    })
  },

  fetchByIsbn(idType, itemIds){
    const itemIdsToRequest = itemIds.slice(0,10).join(",")
    console.log(`API: Amazon ItemLookup for: IdType :${idType}, ItemIds:${itemIdsToRequest}`)
    return client.itemLookup({
      idType: idType,
      itemId: itemIdsToRequest,
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

module.exports = amazonApi
