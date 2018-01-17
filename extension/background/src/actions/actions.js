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

export const showPreview = link => (
  {
    type: types.SHOW_PREVIEW,
    url: link
  }
);

export const getChannels = filteredChannels => (
  {
    type: 'GET_CHANNELS',
    channels: filteredChannels
  });

export const hideLoginButton = () => (
  {
    type: 'HIDE_LOGIN_BUTTON'
  });

