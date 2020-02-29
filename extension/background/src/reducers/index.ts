import { combineReducers } from 'redux';

import login from './login';
import channels from './channels';
import showComponents from './showComponents';

export default combineReducers({
  channels,
  login,
  showComponents
});
