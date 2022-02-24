import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initUser } from '../../redux/actionCreators/userAC';
import { isValidPassword, isValidEmail } from '../../helpers/isValid'
import axios from 'axios'
import { Switch } from '@headlessui/react'



function Login(props) {

  const [enabled, setEnabled] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const email = useRef()
  const password = useRef()
  const [isCorrectEmail, setIsCorrectEmail] = useState(false)
  const [isCorrectPassword, setIsCorrectPassword] = useState(false)

  const login = (event) => {
    event.preventDefault();

    if (isCorrectEmail && isCorrectPassword) {

      const data = {
        role: (enabled) ? 'trainer' : 'user',
        email: email.current.value,
        password: password.current.value
      };

      axios({
        url: '/api/login',
        method: 'POST',
        data,
      })
        .then(response => {
          const { token, info, role } = response.data

          localStorage.setItem('auth_token', token);
          dispatch(initUser())
          return navigate('/')
        })
        .catch(error => {
          const { status } = error.response

          // TODO: переделать вывод информации с алерта на текст около кнопки
          switch (status) {
            case 400:
              return window.alert("Неправильный пароль");
            case 404:
              return window.alert("E-mail не найден");
            default:
              console.log(error.response.data.error);
              return window.alert('Ошибка')
          }
        })
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
        <label htmlform="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
        <input ref={email} onChange={checkEmail} name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@mail.com" required="" />
        {(isCorrectEmail) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">Доступно</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500 ">Некорректеный e-mail</span>
        }
      </div>
      <div className="mb-6">
        <label htmlform="password" className="block mb-2 text-sm font-medium text-gray-900 ">Пароль</label>
        <input name="password" ref={password} onChange={checkPassword} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="" />
        {(isCorrectPassword) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">Формат пароля верен</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500 ">Заглавные и строчные латинские буквы и цифры от 3 до 20</span>
        }
      </div>
      <div id="secretKey" className="flex items-center mb-6 gap-2 h-8">
        {/* FIXME: плывет ширина маркера при включении*/}
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11`}>
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
        <div className="text-sm font-medium text-gray-900 " >Войти как инструктор</div>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Войти</button>
    </form>
  );
}

export default Login;
