import {
  HIDE_LOGIN_BUTTON, SHOW_PREVIEW
} from '../actions/actionTypes';


const initialState = {
  hideLoginButton: true,
  showChannelsList: false,
  url: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SHOW_PREVIEW:
    return {
      ...state,
      url: action.url
    }
  case HIDE_LOGIN_BUTTON:
    return {
      ...state,
      hideLoginButton: !state.hideLoginButton,
      showChannelsList: !state.showChannelsList
    };
  default:
    return state;
  }
};
