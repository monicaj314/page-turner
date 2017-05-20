import * as actions from './BestSellersActionCreators';
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('BestSellersList Action Creators', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  const mockState = {
    bestSellersState: {
      bestSellers: []
    }
  }

  it('should dispatch an action to request the best sellers list for a given category', () => {
    const category = 'nyt-0'
    const expectedAction = {
      type: actions.REQUEST_BESTSELLERS,
      category: category
    };

    expect(actions.requestBestSellers(category)).toEqual(expectedAction);
  });


  it('should dispatch an action to receive the best sellers list for a given category', () => {
    const category = 'nyt-0'
    const results = []
    const expectedAction = {
      type: actions.RECEIVE_BESTSELLERS,
      category: category,
      bestSellers: results
    };

    expect(actions.receiveBestSellers(category, results)).toEqual(expectedAction);
  });


  it('should dispatch request/receive actions when fetching best sellers', () => {
    const categoryId = 'nyt-0'
    const results = [] //results in this case don't matter since we're testing proper dispatch of actions.
    const expectedActions = [{
      type: actions.REQUEST_BESTSELLERS, category: categoryId
    },{
      type: actions.RECEIVE_BESTSELLERS, category: categoryId, bestSellers: results
    }]

    nock(process.env.REACT_APP_API_URL)
      .get(`/api/best-sellers?categoryId=${categoryId}`)
      .reply(200, results)

    const store = mockStore(mockState)

    return store.dispatch(actions.fetchBestSellers(categoryId))
      .then(res => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })


});
