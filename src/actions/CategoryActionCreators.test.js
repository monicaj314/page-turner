import * as actions from './CategoryActionCreators';

describe('Book Category actions', () => {
  it('should dispatch an action to request categories', () => {
    const expectedAction = {
      type: actions.REQUEST_CATEGORIES,
    };

    expect(actions.requestCategories()).toEqual(expectedAction);
  });

  it('should dispatch an action to receive categories', () => {
    const categories = [] //use snapshots?
    const expectedAction = {
      type: actions.RECEIVE_CATEGORIES,
      categories: categories
    };

    expect(actions.receiveCategories(categories)).toEqual(expectedAction);
  });

  // TODO: Update Category


});
