import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'

import Login from './components/Login/Login';
import Admin from './components/Login/Admin';
import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import TopMenu from './components/Navbars/TopMenu';
import UserProfile from './components/Profiles/UserProfile';
import AdminProfile from './components/Profiles/AdminProfile';
import TrainerProfile from './components/Profiles/TrainerProfile';
import HouseSearchForm from './components/Forms/HouseSearchForm';

import { checkUser } from './redux/sagaCreators/userSagaCreators';
import RoomsSearch from './components/Search/RoomsSearch';
import BottomMenu from './components/Navbars/BottomMenu';
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
          <TopMenu />
          <section className="mb-[10px] flex flex-col flex-1 items-center overflow-y-auto">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<HouseSearchForm />} />
              <Route path="/skipass" element={<SkiPassForm />} />
              <Route path="/login/admin" element={<Admin />} />
              <Route path="/registration" element={<Registration />} />

              {role === "user" && [
                <Route path="/profile" key={'userProfile'} element={<UserProfile />} />,
                <Route path="/search/rooms/:type" key={'userSearchRooms'} element={<RoomsSearch />} />,
                <Route path="/search/cottages/:type" key={'userSearchCottages'} element={<RoomsSearch />} />,
                <Route path="/search/hotels" key={'userSearchHottels'} element={<RoomsSearch />} />
              ]}

              {role === "admin" && [
                <Route path="/profile" key={'adminProfile'} element={<AdminProfile />} />,
                <Route path="/search/rooms/:type" key={'adminSearchRooms'} element={<RoomsSearch />} />,
                <Route path="/search/cottages/:type" key={'adminSearchCottages'} element={<RoomsSearch />} />,
                <Route path="/search/hotels" key={'adminSearchHottels'} element={<RoomsSearch />} />
              ]}

              {role === "trainer" && [
                <Route path="/profile" key={'trainerProfile'} element={<TrainerProfile />} />
              ]}

            </Routes>
          </section>

          <BottomMenu />
        </>
      }
    </BrowserRouter >
  );
}

export default App;
