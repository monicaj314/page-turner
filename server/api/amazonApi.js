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
    }).catch(error => {
      let errorMessage = `Amazon Error: Error Fetching categories`
      console.error(parseAmazonError(error))
      throw new Error(errorMessage)
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
    }).catch(error => {
      let errorMessage = `Amazon Error: Error Fetching best sellers for ${externalId}`
      console.error(parseAmazonError(error))
      throw new Error(errorMessage)
    })
  },

  fetchByIsbn(idType, itemIds){
    const itemIdsToRequest = itemIds.slice(0,10).join(",")
    console.log(`API: Amazon ItemLookup for IdType:${idType}, ItemIds:${itemIdsToRequest}`)
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
    }).catch(error => {
      const errorMessage = `Amazon Error: Error Fetching by ISBN for: IdType :${idType}, ItemIds:${itemIdsToRequest}`
      const parsedErrorMessage = parseAmazonError(error)
      if (parsedErrorMessage){
        console.error(parsedErrorMessage)
        throw new Error(parsedErrorMessage)
      }
      console.error(errorMessage)
      throw new Error(errorMessage)
    })
  },

  fetchByTitle(author, title){
    return client.itemSearch({
      title: title,
      author: author,
      condition:'New',
      merchantId: 'Amazon',
      searchIndex: 'Books',
      includeReviewsSummary: true,
      truncateReviewsAt: 150,
      responseGroup: 'Large,Reviews,Similarities'
    }).then(function(results){
      return results
    }).catch(function(error){
      const errorMessage = `Amazon Error: Error Fetching by book title:${title}`
      const parsedErrorMessage = parseAmazonError(error)
      if (parsedErrorMessage){
        console.error(parsedErrorMessage)
        throw new Error(parsedErrorMessage)
      }
      console.error(errorMessage)
      throw new Error(errorMessage)
    })
  }
}

let parseAmazonError = (error) => {
  if (Array.isArray(error) && error.length > 0){
    var err = error[0].Error
  } else if (error.Error) {
    var err = error.Error
  }

  if (err.length > 0 && err[0].Code && err[0].Message){
    let code = ''
    let message = ''
    err.forEach(function(error) {
      code = `${code} ${error.Code[0]}`
      message = `${message} ${error.Message[0]}`
    }, this);
    console.log(message)
    return `Amazon Error: ${code} - ${message}`
  }
}


module.exports = amazonApi
