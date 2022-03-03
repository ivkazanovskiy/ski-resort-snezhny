import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function BottomMenu(props) {

  const { role } = useSelector(state => state.userReducer)

  return (

    <>
      <nav className="backdrop-blur-sm bg-white/80 rounded-lg h-20 flex justify-around">
        {
          (role === 'user' || role === undefined)
          &&
          [
            <NavLink to="/" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                home
              </span>
            </NavLink>,
            <NavLink to="/search" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                hotel
              </span>
            </NavLink>,
            <NavLink to="/skipass" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                style
              </span>
            </NavLink>,
            <NavLink to="/school" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                downhill_skiing
              </span>
            </NavLink>,
            <NavLink to="/orders" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                calendar_month
              </span>
            </NavLink>,
            <NavLink to="/profile" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                assignment_ind
              </span>
            </NavLink>,
          ]
        }

        {
          role === 'trainer'
          &&
          [
            <NavLink to="/" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                home
              </span>
            </NavLink>,
            <NavLink to="/orders" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                list_alt
              </span>
            </NavLink>,
            <NavLink to="/calendar" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                calendar_month
              </span>
            </NavLink>,
            <NavLink to="/profile" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                assignment_ind
              </span>
            </NavLink>,
          ]
        }

        {
          role === 'admin'
          &&
          [
            <NavLink to="/" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                home
              </span>
            </NavLink>,
            <NavLink to="/search" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                hotel
              </span>
            </NavLink>,
            <NavLink to="/orders" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                list_alt
              </span>
            </NavLink>,
            <NavLink to="/calendar" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                calendar_month
              </span>
            </NavLink>,
            <NavLink to="/profile" className="botmenu-btn">
              <span class="material-icons text-current-navy text-4xl">
                assignment_ind
              </span>
            </NavLink>,
          ]
        }
      </nav>
    </>
  )
}

export default BottomMenu;
