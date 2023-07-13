import "./Navbar.css";
import React, { useState } from 'react';
import beorn_image from '../assets/Logo-Beorn_Solutions.svg'

function Navbar() {
  const [viewBView, setViewBView] = useState('VIEW ALREADY SAVED V-CARD');

  const handleClick = () => {
    setViewBView('CREATE A NEW V-CARD');
  }
  return (
    <nav>
      <ul>
        <li>
          <a className='return' href='/'>{'<'} RETURN </a>
        </li>
        <div className='beorn_position'>
          <img className='beorn_navbar' src={beorn_image} alt="Beorn Logo" />
        </div>
        <li>
          <a className='viewB' href='/view' onClick={handleClick}>{viewBView}</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
