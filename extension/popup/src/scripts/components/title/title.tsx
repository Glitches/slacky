import * as React from 'react';

import './title.css';

export const Title = React.memo(() => (
  <div className='wrap-title'>
    <div>
      <h1>SLACKY</h1>
    </div>
    <img src={require('../../../assets/slacky-icon.png')} alt='slacky-icon' />
  </div>
));
