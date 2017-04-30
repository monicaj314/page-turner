const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
var amazon = require('amazon-product-api')
var keys = require('./utilities/apiKeys.json')
var fetch = require('isomorphic-fetch');
var request = require('request')

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
        Id: 'amz-'+result.BrowseNodeId[0],
        Name: result.Name[0]
      }
    })
    res.json(cats)
  }).catch(function(err){
    console.log(results)
    res.json(err)
  });
})

app.get('/api/book-categories', (req,res) => {
  let categories = {}
  
  let nytCategories = fetchNytCategories()
     .then(results => categories.nytCategories = results)

  let amzCategories = fetchAmzCategories()
    .then(results => categories.amzCategories = results)

  Promise.all([nytCategories, amzCategories])
    .then(() => res.json(categories))
    .catch((err) => {
      console.error(err)
      res.status(500).send(err.message)
    })

})

function fetchNytCategories(){
  const url = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${keys.nyt_key}`
  return fetch(url)
    .then(response => {
      if (response.status >= 400) {
			  throw new Error("Bad response from server")
		  }
      return response.json()
    })
    .then(json => {
      const nytCategories = json.results
      let cats = nytCategories.map((result, key) => {
        return {
          Id: 'nyt-'+key,
          Name: result.list_name
        }
      })
      return cats
    })
}

function fetchAmzCategories(){
  return client.browseNodeLookup({
    Operation: 'BrowseNodeLookup',
    BrowseNodeId: 1000, //Books -> Subjects
    responseGroup: 'BrowseNodeInfo'
  }).then(function(results){
    const amzCategories = results[0].Children[0].BrowseNode
    let cats = amzCategories.map(result => {
      return {
        Id: 'amz-'+result.BrowseNodeId[0],
        Name: result.Name[0]
      }
    })
    return cats
  })
}


app.get('/api/amazon-categories-test', (req,res) => {
    console.log('AMAZON TEST API CALL')
    const cats = [
      {
        "Id": "1",
        "Name": "Arts & Photography"
      },
      {
        "Id": "2",
        "Name": "Biographies & Memoirs"
      },
      {
        "Id": "3",
        "Name": "Business & Money"
      },
      {
        "Id": "3248857011",
        "Name": "Calendars"
      },
      {
        "Id": "4",
        "Name": "Children's Books"
      },
      {
        "Id": "12290",
        "Name": "Christian Books & Bibles"
      },
      {
        "Id": "4366",
        "Name": "Comics & Graphic Novels"
      },
      {
        "Id": "5",
        "Name": "Computers & Technology"
      },
      {
        "Id": "6",
        "Name": "Cookbooks, Food & Wine"
      },
      {
        "Id": "48",
        "Name": "Crafts, Hobbies & Home"
      },
      {
        "Id": "8975347011",
        "Name": "Education & Teaching"
      },
      {
        "Id": "173507",
        "Name": "Engineering & Transportation"
      },
      {
        "Id": "301889",
        "Name": "Gay & Lesbian"
      },
      {
        "Id": "10",
        "Name": "Health, Fitness & Dieting"
      },
      {
        "Id": "9",
        "Name": "History"
      },
      {
        "Id": "86",
        "Name": "Humor & Entertainment"
      },
      {
        "Id": "10777",
        "Name": "Law"
      },
      {
        "Id": "17",
        "Name": "Literature & Fiction"
      },
      {
        "Id": "173514",
        "Name": "Medical Books"
      },
      {
        "Id": "18",
        "Name": "Mystery, Thriller & Suspense"
      },
      {
        "Id": "20",
        "Name": "Parenting & Relationships"
      },
      {
        "Id": "3377866011",
        "Name": "Politics & Social Sciences"
      },
      {
        "Id": "21",
        "Name": "Reference"
      },
      {
        "Id": "22",
        "Name": "Religion & Spirituality"
      },
      {
        "Id": "23",
        "Name": "Romance"
      },
      {
        "Id": "75",
        "Name": "Science & Math"
      },
      {
        "Id": "25",
        "Name": "Science Fiction & Fantasy"
      },
      {
        "Id": "4736",
        "Name": "Self-Help"
      },
      {
        "Id": "26",
        "Name": "Sports & Outdoors"
      },
      {
        "Id": "28",
        "Name": "Teen & Young Adult"
      },
      {
        "Id": "5267710011",
        "Name": "Test Preparation"
      },
      {
        "Id": "27",
        "Name": "Travel"
      }
    ]
    res.json(cats)
})


app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

module.exports = app
