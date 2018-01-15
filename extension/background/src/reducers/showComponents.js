import {
  HIDE_LOGIN_BUTTON
} from '../actions/actionTypes';


const initialState = {
  hideLoginButton: true,
  showChannelsList: false
};

export default (state = initialState, action) => {
  switch (action.type) {
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
