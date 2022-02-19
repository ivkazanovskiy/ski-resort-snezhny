import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authUser } from '../../redux/actionCreators/userAC';

function Login(props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const login = async (event) => {
    event.preventDefault();

    const {
      email: { value: email },
      password: { value: password },
    } = event.target

    const body = JSON.stringify({ email, password });

    const response = await fetch('/api/login', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then(data => data.json())
      .catch(console.error)

    switch (response.message) {
      case 'authorized':
        dispatch(authUser())
        return navigate('/');
      case 'incorrectPassword':
        return window.alert("Wrong password");
      case 'notFound':
        return window.alert("Email is absent");
      default:
        return window.alert(response.message);
    }
  }

  return (

    <>
      <form onSubmit={login}>
        <div className="mb-6">
          <label htmlform="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
          <input name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required="" />
        </div>
        <div className="mb-6">
          <label htmlform="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
          <input name="password" type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign-in</button>
      </form>
    </>
  );
}

export default Login;
