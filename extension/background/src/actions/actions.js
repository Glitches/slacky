import * as types from './actionTypes';
// import OAuth from '../api/dataExchangeApi';

export const authorizationSuccess = token => (
  {
    type: types.AUTH_SUCCESS,
    state: token
  }
);

export const postLinkOnChannel = link => (
  {
    type: types.POST_LINK,
    payload: link
  }
);
