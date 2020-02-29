import {
  GET_CHANNELS, POST_LINK
} from '../actions/actionTypes';


const initialState = {
  channels: [],
  link: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
  case GET_CHANNELS:
    return {
      channels: action.channels
    };
    case POST_LINK:
    return {
      ...state,
      link: action.link
    };
  default:
    return state;
  }
};
