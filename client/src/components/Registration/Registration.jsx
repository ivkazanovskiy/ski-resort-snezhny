import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Switch } from '@headlessui/react'

import { trainerKey } from '../../helpers/trainerKey'
import { registrationUser } from '../../redux/sagaCreators/userSagaCreators';
import { isValidPassword, isValidName, isValidEmail, isValidPhone } from '../../helpers/isValid'

function Registration(props) {


  // индикатор поля ввода для инструктора
  const [enabled, setEnabled] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const name = useRef()
  const surname = useRef()
  const phone = useRef()
  const email = useRef()
  const password = useRef()
  const passwordRepeat = useRef()
  const secret = useRef()

  const [areSamePasswords, setAreSamePasswords] = useState(false)
  const [isCorrectName, setIsCorrectName] = useState(false)
  const [isCorrectSurname, setIsCorrectSurname] = useState(false)
  const [isCorrectPhone, setIsCorrectPhone] = useState(false)
  const [isCorrectEmail, setIsCorrectEmail] = useState(false)
  const [isCorrectPassword, setIsCorrectPassword] = useState(false)

  const checkName = () => {
    setIsCorrectName(isValidName(name.current.value))
  }

  const checkSurname = () => {
    setIsCorrectSurname(isValidName(surname.current.value))
  }

  const checkPhone = () => {
    setIsCorrectPhone(isValidPhone(phone.current.value))
  }

  const checkEmail = () => {
    setIsCorrectEmail(isValidEmail(email.current.value))
  }

  const checkPassword = () => {
    setIsCorrectPassword(isValidPassword(password.current.value))
  }

  const checkPasswords = () => {
    (password.current.value && password.current.value === passwordRepeat.current.value) ? setAreSamePasswords(true) : setAreSamePasswords(false)
  }

  const registration = async (event) => {
    event.preventDefault();

    if (enabled) {
      if (secret.current.value !== trainerKey) return window.alert(`Некорректный ключ инструктора\nВведите верный, либо закройте поле ввода`)
    }

    if (isCorrectName && isCorrectEmail && isCorrectSurname && isCorrectPhone && isCorrectPassword && areSamePasswords) {
      const data = {
        name: name.current.value,
        surname: surname.current.value,
        phone: phone.current.value,
        email: email.current.value,
        password: password.current.value,
        secret: secret.current ? secret.current.value : undefined
      };

      return dispatch(registrationUser(data, navigate))
    }
  }

  return (
    <form onSubmit={registration} className="w-96">
      <div className="mb-2">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Имя</label>
        <input ref={name} onChange={checkName} name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="" />
        {(isCorrectName) ?
          <span className="block text-sm font-medium text-green-500 ">✓</span>
          :
          <span className="block text-sm font-medium text-red-500">Заглавные и строчные буквы, дефис и подчеркивание</span>
        }
      </div>
      <div className="mb-2">
        <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 ">Фамилия</label>
        <input ref={surname} onChange={checkSurname} name="surname" type="text" id="surname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="" />
        {(isCorrectSurname) ?
          <span className="block text-sm font-medium text-green-500 ">✓</span>
          :
          <span className="block text-sm font-medium text-red-500">Заглавные и строчные буквы, дефис и подчеркивание</span>
        }
      </div>
      <div className="mb-2">
        {/* TODO: сделать онлайн проверку занятоcти после прохождения регулярки */}
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Телефон</label>
        <input ref={phone} onChange={checkPhone} name="phone" type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="" />
        {(isCorrectPhone) ?
          <span className="block text-sm font-medium text-green-500 ">✓</span>
          :
          <span className="block text-sm font-medium text-red-500">Телефон в формате +79991112233</span>
        }
      </div>
      <div className="mb-2">
        {/* TODO: сделать онлайн проверку занятоcти после прохождения регулярки */}
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
        <input ref={email} onChange={checkEmail} name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@mail.com" required="" />
        {(isCorrectEmail) ?
          <span className="block text-sm font-medium text-green-500 ">✓</span>
          :
          <span className="block text-sm font-medium text-red-500 ">Некорректеный e-mail</span>
        }
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Пароль</label>
        <input name="password" ref={password} onChange={() => { checkPasswords(); checkPassword() }} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="" />
        {(isCorrectPassword) ?
          <span className="block text-sm font-medium text-green-500 ">✓</span>
          :
          <span className="block text-sm font-medium text-red-500 ">Заглавные, строчные буквы и цифры</span>
        }
      </div>
      <div className="mb-2">
        <label htmlFor="passwordRepeat" className="block mb-2 text-sm font-medium text-gray-900 ">Повторите пароль</label>
        <input name="passwordRepeat" ref={passwordRepeat} onChange={checkPasswords} type="password" id="passwordRepeat" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" />
        {(areSamePasswords) ?
          <span className="block text-sm font-medium text-green-500 ">✓</span>
          :
          <span className="block text-sm font-medium text-red-500 ">Пароли не совпадают</span>
        }
      </div>
      <div id="secretKey" className="flex items-center mb-2 gap-2 h-8">
        {/* FIXME: плывет ширина маркера при включении*/}
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11`}>
          <span
            className={`${enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
        {enabled
          ?
          <input name="secret" ref={secret} type="text" id="secert" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required="" placeholder="Введите секретное слово" />
          :
          <div className="text-sm font-medium text-gray-900 " >Зарегистрироватся как инструктор</div>
        }
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Зарегистрироваться</button>
    </form>
  );
}

export default Registration;
