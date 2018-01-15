
import React from 'react';
import slackyImg from '../../../assets/slacky-icon.png';
import './title.css';

const Title = () => {
  return (
    <div className='wrapTitle'>
      <div>
        <h1>SLACKY</h1>
      </div>
      <img src={slackyImg} alt="slacky-icon" />
    </div>
  )
}

export default Title;