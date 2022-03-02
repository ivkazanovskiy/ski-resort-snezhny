import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUser } from '../../redux/actionCreators/userAC';

function TopMenu() {

  const { auth } = useSelector(state => state.userReducer)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggle = () => setIsOpen(!isOpen)

  const logout = async (event) => {
    event.preventDefault()
    localStorage.removeItem('auth_token')
    dispatch(deleteUser())
    return navigate('/')
  }
  const { isLoading, isSuccess, data } = useQuery('weatherQuery', () => axios('/data/2.5/weather?lat=60.521970&lon=29.764107&appid=f42b2f779a9734d9aa2d43a8aef21bf8'));

  const weather = useRef();

  let t
  if (isSuccess) {
    const number = Math.round(data.data.main.temp - 273)
    t = (number > 0) ? `+${number}°C` : `${number}°C`
    if (number === 0) t = 0
  }

  return (
    <>
      <nav className="absolute right-[10px] backdrop-blur-sm bg-white/80 rounded-lg h-16 flex items-center p-4 z-10">
        <div className="">
          {t && `${t}`}
        </div>
        <button onClick={toggle} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-2" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
      </nav>
      {isOpen &&
        <section className="absolute top-0 left-0 w-full h-full backdrop-blur-md flex  z-10">
          <div onClick={() => toggle()} className="flex w-1/4 justify-center pt-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <aside className="w-3/4 h-full p-6 text-custom-navy  bg-white/90 flex items-center" >
            <ul className="flex flex-col gap-6">
              <li>
                <Link to="/map" onClick={() => toggle()} className="nav-link">Карта курорта</Link>
              </li>
              <li>
                <Link to="/" onClick={() => toggle()} className="nav-link">Корпоративный отдых</Link>
              </li>
              <li>
                <Link to="/" onClick={() => toggle()} className="nav-link">Рестораны</Link>
              </li>
            </ul>
          </aside>
        </section>
      }
    </>
  );
}

export default TopMenu;
