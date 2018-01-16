import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { saveState, loadState } from './localStorage';
import logger from 'redux-logger';
import throttle from 'lodash/throttle';

import { authorize } from './actions/actions';


import {wrapStore} from 'react-chrome-redux';

const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(thunk), 
  applyMiddleware(logger),
);

// store.dispatch(authorize());
store.subscribe(throttle(() => {
  saveState({
    login: store.getState().login,
    channels: store.getState().channels
  })
}), 1000);

wrapStore(store, {
  portName: 'example'
});
