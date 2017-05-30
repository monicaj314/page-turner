import configureMockStore from 'redux-mock-store'
import * as actions from './CategoryActionCreators'
import nock from 'nock'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Book Category Actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  const categories = [{
      "externalId": "combined-print-and-e-book-fiction",
      "id": "nyt-0",
      "listSource": "New York Times",
      "listSourceId": "NYT",
      "name": "Combined Print & E-Book Fiction",
      "visible": true,
      "urlParam" : "nyt-combined-print-and-e-book-fiction"
    }]

  const mockState = {
    categoryState: {
      categories: categories
    }
  }

  it('should dispatch an action to request categories', () => {
    const expectedAction = {
      type: actions.REQUEST_CATEGORIES,
    };

    expect(actions.requestCategories()).toEqual(expectedAction);
  });


  it('should dispatch an action to receive categories', () => {
    const expectedAction = {
      type: actions.RECEIVE_CATEGORIES,
      categories: categories
    };

    expect(actions.receiveCategories(categories)).toEqual(expectedAction);
  });


  it('should dispatch an action to update the selected category', () => {
    const expectedAction = { type: actions.UPDATE_CATEGORY, category: categories[0] }

    const store = mockStore(mockState)
    store.dispatch(actions.updateCategory('nyt-0'))
    expect(store.getActions()[0]).toEqual(expectedAction)
  })

  it('should dispatch an action to update the selected category using the URL parameter', () => {
    const expectedAction = { type: actions.UPDATE_CATEGORY, category: categories[0] }

    const store = mockStore(mockState)
    store.dispatch(actions.updateCategoryWithUrlParam('nyt-combined-print-and-e-book-fiction'))
    expect(store.getActions()[0]).toEqual(expectedAction)
  })

  it('should dispatch request/receive actions when fetching categories', () => {
    const expectedActions = [
      { type: actions.REQUEST_CATEGORIES },
      { type: actions.RECEIVE_CATEGORIES, categories: categories }
    ]

    nock(process.env.REACT_APP_API_URL)
      .get('/api/book-categories')
      .reply(200, categories)

    const store = mockStore(mockState)

    return store.dispatch(actions.fetchCategories())
     .then((res) => {
       expect(store.getActions()).toEqual(expectedActions)
     })
  })

  it('should dispatch an action to start initial category load', () => {
    const expectedAction = {
      type: actions.INITIAL_CATEGORY_LOAD_START,
    };

    expect(actions.initialCategoryLoadStart()).toEqual(expectedAction);
  });


  it('should dispatch an action to mark the completion of initial category load', () => {
    const expectedAction = {
      type: actions.INITIAL_CATEGORY_LOAD_COMPLETE,
    };

    expect(actions.initialCategoryLoadComplete()).toEqual(expectedAction);
  });



})
