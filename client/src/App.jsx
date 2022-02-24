import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'

import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import UserProfile from './components/Profiles/UserProfile';

import { initUser, deleteUser } from './redux/actionCreators/userAC';

function App() {

  axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('auth_token')}`

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {

      axios({
        url: '/api/checkUser',
      })
        .then(response => dispatch(initUser()))
        .catch(error => dispatch(deleteUser()))
    }
  }, [dispatch])

  return (
    <BrowserRouter >
      <NavBar />
      <section className="flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </section>
    </BrowserRouter >
  );
}

export default App;
