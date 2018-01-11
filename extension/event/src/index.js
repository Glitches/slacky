import {createStore} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';


import {wrapStore} from 'react-chrome-redux';
import { applyMiddleware } from 'redux';

const store = createStore(rootReducer,
    applyMiddleware(thunk));

wrapStore(store, {
    portName: 'example'
});
