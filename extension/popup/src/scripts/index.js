import React from 'react';
import {render} from 'react-dom';

import App from './components/app/App';
import {Store} from 'react-chrome-redux';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const proxyStore = new Store({
  portName: 'example'
});




render(
    <Provider store={proxyStore}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
  , document.getElementById('app'));
