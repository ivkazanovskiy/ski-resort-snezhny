import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'

import Login from './components/Login/Login';
import Admin from './components/Login/Admin';
import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import UserProfile from './components/Profiles/UserProfile';
import AdminProfile from './components/Profiles/AdminProfile';
import TrainerProfile from './components/Profiles/TrainerProfile';
import HouseSearchForm from './components/Forms/HouseSearchForm';

import { checkUser } from './redux/sagaCreators/userSagaCreators';
import RoomsSearch from './components/Search/RoomsSearch';
import BottomMenu from './components/NavBar/BottomMenu';
import SkiPassForm from './components/Forms/SkiPassForm';
import { deleteUser } from './redux/actionCreators/userAC';

function App() {
  // автоматически в запросе отправляем заголовок с токеном
  axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('auth_token')}`

  const dispatch = useDispatch()
  const { auth, role } = useSelector(state => state.userReducer)

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      dispatch(checkUser())
    } else {
      dispatch(deleteUser())
    }
  }, [dispatch])


  return (
    <BrowserRouter >
      {/* пока грузится инфа об авторизации - белый экран, чтобы не мерцало */}
      {(auth === undefined) ?
        ''
        :
        <>
          <NavBar />
          <section className="flex-1 flex flex-col mb-20 items-center overflow-y-auto w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<HouseSearchForm />} />
              <Route path="/skipass" element={<SkiPassForm />} />
              <Route path="/login/admin" element={<Admin />} />
              <Route path="/registration" element={<Registration />} />

              {role === "user" && <Route path="/profile" element={<UserProfile />} />}
              {role === "trainer" && <Route path="/profile" element={<TrainerProfile />} />}
              {role === "admin" && <Route path="/profile" element={<AdminProfile />} />}
              {(role === "user" || role === "admin") && <Route path="/search/rooms/:type" element={<RoomsSearch />} />}
              {(role === "user" || role === "admin") && <Route path="/search/cottages/:type" element={<RoomsSearch />} />}
              {(role === "user" || role === "admin") && <Route path="/search/hotels" element={<RoomsSearch />} />}
            </Routes>
          </section>
          <BottomMenu />
        </>
      }
    </BrowserRouter >
  );
}

export default App;
