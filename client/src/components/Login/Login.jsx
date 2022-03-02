import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Switch } from '@headlessui/react'

import { loginUser } from '../../redux/sagaCreators/userSagaCreators';
import { isValidPassword, isValidEmail } from '../../helpers/isValid'


function Login(props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const email = useRef()
  const password = useRef()

  const [enabled, setEnabled] = useState(false)
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

      return dispatch(loginUser(data, navigate))
    }
  }

  const checkEmail = () => {
    setIsCorrectEmail(isValidEmail(email.current.value))
  }

  const checkPassword = () => {
    setIsCorrectPassword(isValidPassword(password.current.value))
  }

  return (
    <form onSubmit={login} className="card flex-col mb-2 mt-8">
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="email" className="basis-2/6 edit-label text-center">Email</label>
          <input ref={email} onChange={checkEmail} name="email" type="email" id="email" className="basis-4/6 edit-input border-[1px] border-white/0" />
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="password" className="basis-2/6 edit-label text-center">Пароль</label>
          <input ref={password} onChange={checkPassword} name="password" type="password" id="password" className={`basis-4/6 edit-input border-[1px] border-white/0`} />
        </div>
      </div>
      <div className="flex flex-row justify-around justify-items-center items-center">
        <label className="edit-label basis-2/6 text-center">Войти как инструктор</label>
        <div className="basis-4/6">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-custom-blue/60' : 'bg-custom-gray/60'}
          relative inline-flex flex-shrink-0 h-[24px] w-[48px] border-2 border-transparent rounded-lg cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] rounded-lg bg-white transform ring-0 transition ease-in-out duration-200`} />
          </Switch>
        </div>
      </div>
      <button type="submit" className="px-4 py-2 my-2 text-white bg-custom-blue font-medium rounded-lg text-base w-full text-center">Войти</button>
    </form>
  );
}

export default Login;
