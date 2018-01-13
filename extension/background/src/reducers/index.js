import {combineReducers} from 'redux';

import login from './login';
import channels from './channels';

export default combineReducers({
  channels,
  login
});
