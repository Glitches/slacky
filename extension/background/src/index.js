import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { saveState, loadState } from './localStorage';
import logger from 'redux-logger';
import throttle from 'lodash/throttle';
import './api.js';

import { showPreview, getChannels, hideLoginButton } from './actions/actions';


import {wrapStore} from 'react-chrome-redux';
import { getChannelList } from './api.js';

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

export const createChannels = async () => {
  const channels = await getChannelList();
  store.dispatch(getChannels(channels));
}


store.subscribe(throttle(() => {
  saveState({
    login: store.getState().login,
    channels: store.getState().channels
  });
}), 1000);

wrapStore(store, {
  portName: 'example'
});
