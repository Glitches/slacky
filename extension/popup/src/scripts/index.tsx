import React from 'react';
import { render } from 'react-dom';

import App from './application/app/App';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';

const proxyStore = new Store({ portName: 'example' });

render(
  <Provider store={proxyStore}>
    <App />
  </Provider>,
  document.getElementById('app')
);
