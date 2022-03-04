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
import EditRoomCard from './components/Cards/EditRoomCard';

import { checkUser } from './redux/sagaCreators/userSagaCreators';
import RoomsSearch from './components/Search/RoomsSearch';
import BottomMenu from './components/Navbars/BottomMenu';
import SkiPassForm from './components/Forms/SkiPassForm';
import { deleteUser } from './redux/actionCreators/userAC';
import Map from './components/Pages/Map';
import CalendarTrainer from './components/Pages/CalendarTrainer';
import AddUserScheduleCard from './components/Cards/AddUserScheduleCard';

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
          <section className="mt-[72px] rounded-lg flex flex-col flex-1 items-center justify-end overflow-y-auto">
            <Routes>

              <Route path="/" key="home" element={<Home />} />
              <Route path="/map" key="map" element={<Map />} />
              <Route path="/login" key="login" element={<Login />} />
              <Route path="/admin" key="admin" element={<Admin />} />
              <Route path="/registration" key="registration" element={<Registration />} />,
              <Route path="/search" key="adminSearchRooms" element={<HouseSearchForm />} />,

              {
                (role !== 'trainer' && role !== 'admin') &&
                <Route path="/profile" key="profile" element={<EditUserProfileCard />} />
              }

              {role === 'user' && [
                <Route path="/skipass" key="userSkiPass" element={<SkiPassForm />} />,
                <Route path="/school" key="school" element={<AddUserScheduleCard />} />,
                <Route path="/orders" key="userOrders" element={<UserProfile />} />,
                <Route path="/search/:type" key="userSearchRooms" element={<RoomsSearch />} />,
              ]}

              {role === "admin" && [
                <Route path="/calendar" key="dminOrdersForm" element={<AdminOrdersForm />} />,
                <Route path="/profile" key="editAdminProfile" element={<EditAdminProfileCard />} />,
                <Route path="/orders" key="adminProfile" element={<AdminProfile />} />,
                <Route path="/search/:type" key="adminSearchRooms" element={<RoomsSearch />} />,
                <Route path="/edit/:type" key="editRoomCard" element={<EditRoomCard />} />,
              ]}

              {role === "trainer" && [
                <Route path="/profile" key="editTrainerProfile" element={<EditTrainerProfileCard />} />,
                <Route path="/calendar" key="trainerCalendar" element={<CalendarTrainer />} />,
                <Route path="/orders" key="trainerProfile" element={<TrainerTimetable />} />
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
