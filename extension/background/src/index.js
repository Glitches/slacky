import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { saveState, loadState } from './localStorage';
import logger from 'redux-logger';
import throttle from 'lodash/throttle';

import { showPreview } from './actions/actions';


import {wrapStore} from 'react-chrome-redux';

const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(thunk), 
  applyMiddleware(logger)
);


chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    console.log(tab.url);
    store.dispatch(showPreview(tab.url));
  });
});


store.subscribe(throttle(() => {
  saveState({
    login: store.getState().login,
    channels: store.getState().channels
  });
}), 1000);

wrapStore(store, {
  portName: 'example'
});
