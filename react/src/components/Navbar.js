import "./Navbar.css";
import React, { useState } from 'react';
import beorn_image from '../assets/Logo-Beorn_Solutions.svg'

function Navbar() {
  const [viewBView, setViewBView] = useState('VIEW ALREADY SAVED V-CARD');

  const handleClick = () => {
    setViewBView('CREATE A NEW V-CARD');
  }
  return (
    <div>
      <div className="nav_mobile">
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon">
                <div className="block-color"></div>
                <div className="block-color"></div>
                <div className="block-color"></div>
              </span>
            </button>
          </div>
        </nav>
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-dark p-4">
            <a className="text-white h4" href='/'>HOME </a>
            <a className="text-white h4" href='/create'>GENERATE A NEW CARD </a>
            <a className="text-white h4" href='/cards'>VIEW ALREADY SAVED CARD </a>
          </div>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <a className='return' href='/'>{'<'} RETURN </a>
          </li>
          <div className='beorn_position'>
            <img className='beorn_navbar' src={beorn_image} alt="Beorn Logo" />
          </div>
          <li>
            <a className='viewB' href='/cards' onClick={handleClick}>{viewBView}</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
