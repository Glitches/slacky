import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { saveState, loadState } from './localStorage';
import logger from 'redux-logger';

import { authorize } from './actions/actions';


import {wrapStore} from 'react-chrome-redux';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    applyMiddleware(logger)
    // loadState()
);

store.dispatch(authorize());

wrapStore(store, {
    portName: 'example'
});
