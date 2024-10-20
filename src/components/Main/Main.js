import React, { useState } from 'react';
import '../App.css';
import bg_hero from '../../assets/hero_bg.png';
import logo from '../../assets/logo.png';
import Arrow from '../../assets/Arrow.png';

const Main = () => {
  const [hoveredLink, setHoveredLink] = useState(null); // Track which link is hovered

  return (
    <div>
      <div className="flexCenter wfull hscreen">
        <div className="w50 w501">
          <a href='/'>
            <div className='logo'>
              <img alt='logo' src={logo} />
              <h2>Farmingo</h2>
            </div>
          </a>
          <div className='heroHeading'>
            <div className='heading_two'>
              <h2>Welcome to the future </h2>
              <h2>WEB3</h2>
            </div>
            <h4>Get Started</h4>
          </div>
          <div className='nav_buttons'>
            <a
              href='/Login'
              className="flex items-center space-x-2"
              onMouseEnter={() => setHoveredLink('farmer')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <button>Farmer</button>
              <img
                alt='arrow'
                src={Arrow}
                className={`transform transition-transform duration-300 ${hoveredLink === 'farmer' ? 'translate-x-2' : ''}`}
              />
            </a>
            <a
              href='/Buyer'
              className="flex items-center space-x-2"
              onMouseEnter={() => setHoveredLink('buyer')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <button>Buyer</button>
              <img
                alt='arrow'
                src={Arrow}
                className={`transform transition-transform duration-300 ${hoveredLink === 'buyer' ? 'translate-x-2' : ''}`}
              />
            </a>
            <a
              href='/QTesting'
              className="flex items-center space-x-2"
              onMouseEnter={() => setHoveredLink('admin')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <button>Admin</button>
              <img
                alt='arrow'
                src={Arrow}
                className={`transform transition-transform duration-300 ${hoveredLink === 'admin' ? 'translate-x-2' : ''}`}
              />
            </a>
          </div>
          <div className='copyright'>
            <h2>@farmingo copyright</h2>
          </div>
        </div>
        <div className="w50 w502">
          <img className='img' alt='background' src={bg_hero} />
        </div>
      </div>
    </div>
  );
}

export default Main;
