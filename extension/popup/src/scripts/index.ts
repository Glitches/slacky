import React from 'react';
import { render } from 'react-dom';

import { Store } from 'webext-redux';
import { Provider } from 'react-redux';
import App from './application/app/App';

const proxyStore = new Store({ portName: 'example' });

render(
  <Provider store={proxyStore}>
    <App />
  </Provider>,
  document.getElementById('app')
);
