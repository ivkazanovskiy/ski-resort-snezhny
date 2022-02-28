import React, { useState, useRef, useCallback } from 'react';
import { Disclosure } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';

import { isValidPassword, isValidName, isValidEmail, isValidPhone, isValidAboutMe } from '../../helpers/isValid'
import { updateUser } from '../../redux/sagaCreators/userSagaCreators';
import axios from 'axios';

function EditTrainerProfileCard(props) {

  const dispatch = useDispatch()
  const { id, photo } = useSelector(state => state.userReducer);
  const [avatar, setAvatar] = useState(null);

  const name = useRef()
  const surname = useRef()
  const phone = useRef()
  const email = useRef()
  const aboutMe = useRef()
  const passwordOld = useRef()
  const password = useRef()
  const passwordRepeat = useRef()
  const ski = useRef()
  const snowboard = useRef()

  const [areSamePasswords, setAreSamePasswords] = useState(false)
  const [isCorrectName, setIsCorrectName] = useState(true)
  const [isCorrectSurname, setIsCorrectSurname] = useState(true)
  const [isCorrectPhone, setIsCorrectPhone] = useState(true)
  const [isCorrectEmail, setIsCorrectEmail] = useState(true)
  const [isCorrectAboutMe, setIsCorrectAboutMe] = useState(true)
  const [isCorrectPassword, setIsCorrectPassword] = useState(false)
  const [isCorrectPasswordOld, setIsCorrectPasswordOld] = useState(false)

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
  const checkAboutMe = () => {
    setIsCorrectAboutMe(isValidAboutMe(aboutMe.current.value))
  }
  const checkPasswordOld = () => {
    setIsCorrectPasswordOld(isValidPassword(passwordOld.current.value))
  }
  const checkPassword = () => {
    setIsCorrectPassword(isValidPassword(password.current.value))
  }
  const checkPasswords = () => {
    (password.current.value && password.current.value === passwordRepeat.current.value) ? setAreSamePasswords(true) : setAreSamePasswords(false)
  }

  const {
    name: nameCurrent,
    surname: surnameCurrent,
    aboutMe: aboutMeCurrent,
    email: emailCurrent,
    phone: phoneCurrent,
    ski: skiCurrent,
    snowboard: snowboardCurrent } = useSelector(state => state.userReducer)

  const applyChanges = (event) => {
    event.preventDefault()

    if (!password.current) {
      if (isCorrectName && isCorrectEmail && isCorrectSurname && isCorrectPhone && isCorrectAboutMe) {
        const data = {
          name: name.current.value,
          surname: surname.current.value,
          phone: phone.current.value,
          email: email.current.value,
          aboutMe: aboutMe.current.value,
          snowboard: snowboard.current.checked,
          ski: ski.current.checked,
        };
        return dispatch(updateUser(data))
      }
    }

    if (isCorrectName && isCorrectEmail && isCorrectSurname && isCorrectPhone && isCorrectAboutMe && areSamePasswords && isCorrectPassword && isCorrectPasswordOld) {
      const data = {
        name: name.current.value,
        surname: surname.current.value,
        phone: phone.current.value,
        email: email.current.value,
        aboutMe: aboutMe.current.value,
        snowboard: snowboard.current.checked,
        ski: ski.current.checked,
        passwordOld: passwordOld.current.value,
        password: password.current.value
      };
      return dispatch(updateUser(data))
    }


  }

  const updatePhoto = useCallback((event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('photo', avatar);
    console.log('DATA', data);

    axios({
      url: `/api/trainers/${id}`,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(res => {
        console.log(res);
        setAvatar(res.data.photo);
      });
  }, [avatar]);

  return (
    <form className="py-4 border border-gray-300 rounded-lg p-2 ">
      <div className="mb-2">
        <div encType="multipart/form-data">
          <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 ">Фото</label>
          <img className="w-24 h-24 border rounded-full" src={`/photos/${photo}`}></img>
          <input onChange={(event) => {
            console.log('TARGET', event.target.files[0]);
            setAvatar(event.target.files[0]);
          }} name="filedata" type="file" id="photo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"></input>
          <button onClick={updatePhoto}>Изменить фото</button>
        </div>
      </div>
      <div className="mb-2">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Имя</label>
        <input name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" defaultValue={nameCurrent} ref={name} onChange={checkName} />
        {(isCorrectName) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">✓</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500">Имя должно быть короче 20 букв</span>
        }
      </div>
      <div className="mb-2">
        <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 ">Фамилия</label>
        <input name="surname" type="text" id="surname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" defaultValue={surnameCurrent} ref={surname} onChange={checkSurname} />
        {(isCorrectSurname) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">✓</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500">Фамилия должна быть короче 20 букв</span>
        }
      </div>
      <div className="mb-2">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Телефон</label>
        <input name="phone" type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="name@mail.com" defaultValue={phoneCurrent} ref={phone} onChange={checkPhone} />
        {(isCorrectPhone) ?
          <span className="block mb-2 text-sm font-medium text-green-500">✓</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500 ">Телефон в формате +79991112233</span>
        }
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Электронная почта</label>
        <input name="email" type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" placeholder="name@mail.com" defaultValue={emailCurrent} ref={email} onChange={checkEmail} />
        {(isCorrectEmail) ?
          <span className="block mb-2 text-sm font-medium text-green-500">✓</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500 ">Почта указана некорректно</span>
        }
      </div>
      <div className="mb-2">
        <label htmlFor="aboutMe" className="block mb-2 text-sm font-medium text-gray-900 ">О себе</label>
        <textarea name="aboutMe" type="text" id="aboutMe" className="h-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" defaultValue={aboutMeCurrent} ref={aboutMe} onChange={checkAboutMe} />
        {(isCorrectAboutMe) ?
          <span className="block mb-2 text-sm font-medium text-green-500 ">✓</span>
          :
          <span className="block mb-2 text-sm font-medium text-red-500">До 140 символов</span>
        }
      </div>
      <div className="mb-2 flex flex-col border border-gray-300 rounded-lg ">


        <label htmlFor="snowboard" className=" flex gap-2 p-2 grow text-sm font-medium text-gray-900 border-b border-gray-300">
          <input ref={snowboard} defaultChecked={snowboardCurrent} name="snowboard" type="checkbox" id="snowboard" className=" h-4 w-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2" />
          <span>Сноуборд</span>
        </label>
        <label htmlFor="ski" className=" flex gap-2 p-2 grow text-sm font-medium text-gray-900 ">
          <input ref={ski} defaultChecked={skiCurrent} name="ski" type="checkbox" id="ski" className=" h-4 w-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2" />
          <span>Горные лыжи</span>
        </label>


      </div>

      <Disclosure>
        <Disclosure.Button className="flex justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
          <span>Изменить пароль</span>
        </Disclosure.Button>
        <Disclosure.Panel className="pt-4 text-sm text-gray-500">
          <div className="mb-2">
            <label htmlFor="passwordOld" className="block mb-2 text-sm font-medium text-gray-900 ">Старый пароль</label>
            <input name="passwordOld" type="password" id="passwordOld" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" ref={passwordOld} onChange={checkPasswordOld} />
            {(isCorrectPasswordOld) ?
              <span className="block mb-2 text-sm font-medium text-green-500 ">✓</span>
              :
              <span className="block mb-2 text-sm font-medium text-red-500 ">Пароль должен содержать от 3 до 20 букв верхнего и нижнего регистра и цифр</span>
            }
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Новый пароль</label>
            <input name="password" type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" ref={password} onChange={() => { checkPasswords(); checkPassword() }} />
            {(isCorrectPassword) ?
              <span className="block mb-2 text-sm font-medium text-green-500 ">✓</span>
              :
              <span className="block mb-2 text-sm font-medium text-red-500 ">Пароль должен содержать от 3 до 20 букв верхнего и нижнего регистра и цифр</span>
            }
          </div>
          <div className="mb-2">
            <label htmlFor="passwordRepeat" className="block mb-2 text-sm font-medium text-gray-900 ">Повторите пароль</label>
            <input name="passwordRepeat" type="password" id="passwordRepeat" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" ref={passwordRepeat} onChange={checkPasswords} />
            {(areSamePasswords) ?
              <span className="block mb-2 text-sm font-medium text-green-500 ">✓</span>
              :
              <span className="block mb-2 text-sm font-medium text-red-500 ">Пароли не совпадают</span>
            }
          </div>
        </Disclosure.Panel>
      </Disclosure>

      <button type="submit" onClick={applyChanges} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Изменить информацию</button>

    </form>)
}

export default EditTrainerProfileCard;
