import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'

import Login from './components/Login/Login';
import Admin from './components/Login/Admin';
import Registration from './components/Registration/Registration';
import Home from './components/Pages/Home';
import TopMenu from './components/Navbars/TopMenu';
import UserProfile from './components/Profiles/UserProfile';
import AdminProfile from './components/Profiles/AdminProfile';
import TrainerTimetable from './components/Cards/TrainerTimetable';
import HouseSearchForm from './components/Forms/HouseSearchForm';
import EditUserProfileCard from './components/Cards/EditUserProfileCard';
import EditTrainerProfileCard from './components/Cards/EditTrainerProfileCard';
import EditAdminProfileCard from './components/Cards/EditAdminProfileCard';
import AdminOrdersForm from './components/Forms/AdminOrdersForm';

import { checkUser } from './redux/sagaCreators/userSagaCreators';
import RoomsSearch from './components/Search/RoomsSearch';
import BottomMenu from './components/Navbars/BottomMenu';
import SkiPassForm from './components/Forms/SkiPassForm';
import { deleteUser } from './redux/actionCreators/userAC';
import Map from './components/Pages/Map';
import CalendarTrainer from './components/Pages/CalendarTrainer';

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
          <section className="mb-[10px] flex flex-col flex-1 items-center justify-end overflow-y-auto">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<HouseSearchForm />} />
              <Route path="/skipass" element={<SkiPassForm />} />
              <Route path="/login/admin" element={<Admin />} />
              <Route path="/registration" element={<Registration />} />

              {role === "user" && [
                <Route path="/profile" key={'userProfile'} element={<EditUserProfileCard />} />,
                <Route path="/orders" key={'userOrders'} element={<UserProfile />} />,
                <Route path="/search/:type" key={'userSearchRooms'} element={<RoomsSearch />} />,
              ]}

              {role === "admin" && [
                <Route path="/calendar" key={'adminOrdersForm'} element={<AdminOrdersForm />} />,
                <Route path="/profile" key={'editAdminProfile'} element={<EditAdminProfileCard />} />,
                <Route path="/orders" key={'adminProfile'} element={<AdminProfile />} />,
                <Route path="/search/:type" key={'adminSearchRooms'} element={<RoomsSearch />} />,
              ]}

              {role === "trainer" && [
                <Route path="/profile" key={'editTrainerProfile'} element={<EditTrainerProfileCard />} />,
                <Route path="/calendar" key={'trainerCalendar'} element={<CalendarTrainer />} />,
                <Route path="/orders" key={'trainerProfile'} element={<TrainerTimetable />} />
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
