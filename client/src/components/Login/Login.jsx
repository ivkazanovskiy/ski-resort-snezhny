import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authUser } from '../../redux/actionCreators/userAC';
import { isValidPassword, isValidName, isValidEmail } from '../../helpers/isValid'


function Login(props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const email = useRef()
  const password = useRef()
  const [isCorrectEmail, setIsCorrectEmail] = useState(false)
  const [isCorrectPassword, setIsCorrectPassword] = useState(false)

  const login = async (event) => {
    event.preventDefault();

    if (isCorrectEmail && isCorrectPassword) {

      const body = JSON.stringify({
        email: email.current.value,
        password: password.current.value
      });

      const response = await fetch('/api/login', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      })
        .catch(console.error)

      switch (response.status) {
        case 200:
          const { token } = await response.json()
          localStorage.setItem('auth_token', token);
          dispatch(authUser())
          return navigate('/')
        case 400:
          return window.alert("Wrong password");
        case 404:
          return window.alert("Email is absent");
        default:
          const { error } = await response.json()
          console.log(error);
          return window.alert('Error')
      }
    }
  }


  const checkEmail = () => {
    setIsCorrectEmail(isValidEmail(email.current.value))
  }

  const checkPassword = () => {
    setIsCorrectPassword(isValidPassword(password.current.value))
  }

  return (
    <form onSubmit={login} className="w-96">
      <div className="mb-6">
        <label htmlform="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
        <input ref={email} onChange={checkEmail} name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@mail.com" required="" />
        {(isCorrectEmail) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">Email is correct</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500 ">Email is not correct</span>
        }
      </div>
      <div className="mb-6">
        <label htmlform="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
        <input name="password" ref={password} onChange={checkPassword} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="" />
        {(isCorrectPassword) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">Password is correct</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500 ">3 to 20 uppercase and lowercase letters and digits</span>
        }
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Sign-in</button>
    </form>
  );
}

export default Login;
