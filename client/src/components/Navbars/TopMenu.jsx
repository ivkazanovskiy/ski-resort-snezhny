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
      <nav className="absolute right-[10px] backdrop-blur-sm bg-white/80 rounded-[25px] h-16 flex items-center p-4">
        <div className="">
          {t && `${t}`}
        </div>
        <button onClick={toggle} type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-2" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
        {/* <div onClick={toggle} className={(isOpen) ? "fixed mb-2 bg-white top-16 w-full md:block md:w-auto" : "hidden w-full md:block md:w-auto"} id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link to="/" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Домой</Link>
              </li>
              {(auth) ?
                <>
                  < li >
                    <Link to="/profile" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Личный кабинет</Link>
                  </li>
                  < li >
                    <span onClick={logout} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Выйти</span>
                  </li>
                </>
                :
                <>
                  <li>
                    <Link to="/login" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Войти</Link>
                  </li>
                  <li>
                    <Link to="/registration" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Зарегистрироваться</Link>
                  </li>
                </>
              }
            </ul>
          </div> */}
      </nav>
    </>
  );
}

export default TopMenu;
