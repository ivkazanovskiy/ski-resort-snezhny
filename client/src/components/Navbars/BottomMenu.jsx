import React from 'react';
import { NavLink } from 'react-router-dom';

function BottomMenu(props) {
  return (
    <nav className="backdrop-blur-sm bg-white/80 rounded-lg h-20 flex justify-around">
      <NavLink to="/search" className="botmenu-btn">
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-bot" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </NavLink>
      <NavLink to="/" className="botmenu-btn">
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-bot" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </NavLink>
      <NavLink to="/profile" className="botmenu-btn">
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-bot" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </NavLink>
      <NavLink to="/skipass" className="botmenu-btn">
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-bot" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </NavLink>
      <NavLink to="/orders" className="botmenu-btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg-bot" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>

      </NavLink>

    </nav>
  );
}

export default BottomMenu;
