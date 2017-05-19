import * as actions from './BestSellersActionCreators';

describe('BestSellersList actions', () => {
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
    const result = [] //use snapshot?
    const expectedAction = {
      type: actions.RECEIVE_BESTSELLERS,
      category: category,
      bestSellers: result
    };

    expect(actions.receiveBestSellers(category, result)).toEqual(expectedAction);
  });



});
