import fetch from "isomorphic-fetch";

export const REQUEST_BESTSELLERS = "REQUEST_BESTSELLERS";
export function requestBestSellers(category) {
  return {
    type: REQUEST_BESTSELLERS,
    category
  };
}

export const RECEIVE_BESTSELLERS = "RECEIVE_BESTSELLERS";
export function receiveBestSellers(category, result) {
  return {
    type: RECEIVE_BESTSELLERS,
    category: category,
    bestSellers: result
  };
}

export function fetchBestSellers(categoryId) {
  return dispatch => {
    dispatch(requestBestSellers(categoryId));

    const url = `${process.env
      .REACT_APP_API_URL}/api/best-sellers?categoryId=${categoryId}`;

    return fetch(url)
      .then(response => response.json())
      .then(results => dispatch(receiveBestSellers(categoryId, results)));
  };
}
