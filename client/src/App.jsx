
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { authUser, unAuthUser } from './redux/actionCreators/userAC';


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    async function checkUser() {

      const response = await fetch('/api/checkUser', {
        method: 'POST',
        credentials: 'include'
      }).then(data => data.json())
        .catch(console.error)

      switch (response.message) {
        case 'authorized':
          return dispatch(authUser())
        default:
          return dispatch(unAuthUser())
      }
    }
    checkUser()
  }, [dispatch])



  return (
    <BrowserRouter >
      <NavBar />
      <section className="flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </section>
    </BrowserRouter >
  );
}

export default App;
