import React, { useState, useRef } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { isValidPassword, isValidName, isValidEmail, isValidPhone } from '../../helpers/isValid'
import { updateUser } from '../../redux/sagaCreators/userSagaCreators';
import { deleteUser } from '../../redux/actionCreators/userAC';


function EditAdminProfileCard(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef()
  const surname = useRef()
  const phone = useRef()
  const email = useRef()
  const passwordOld = useRef()
  const password = useRef()
  const passwordRepeat = useRef()

  const [areSamePasswords, setAreSamePasswords] = useState(true)
  const [isCorrectName, setIsCorrectName] = useState(true)
  const [isCorrectSurname, setIsCorrectSurname] = useState(true)
  const [isCorrectPhone, setIsCorrectPhone] = useState(true)
  const [isCorrectEmail, setIsCorrectEmail] = useState(true)
  const [isCorrectPassword, setIsCorrectPassword] = useState(true)
  const [isCorrectPasswordOld, setIsCorrectPasswordOld] = useState(true)

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
    email: emailCurrent,
    phone: phoneCurrent, } = useSelector(state => state.userReducer)

  const applyChanges = (event) => {
    event.preventDefault()

    if (!password.current) {
      if (isCorrectName && isCorrectEmail && isCorrectSurname && isCorrectPhone) {
        const data = {
          name: name.current.value,
          surname: surname.current.value,
          phone: phone.current.value,
          email: email.current.value,
        };
        return dispatch(updateUser(data))
      }
    }

    if (isCorrectName && isCorrectEmail && isCorrectSurname && isCorrectPhone && areSamePasswords && isCorrectPassword && isCorrectPasswordOld) {
      const data = {
        name: name.current.value,
        surname: surname.current.value,
        phone: phone.current.value,
        email: email.current.value,
        passwordOld: passwordOld.current.value,
        password: password.current.value
      };
      return dispatch(updateUser(data))
    }
  }

  const logout = async (event) => {
    event.preventDefault()
    localStorage.removeItem('auth_token')
    dispatch(deleteUser())
    return navigate('/')
  }

  return (
    <form className="card flex-col mb-2 mt-8">
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="name" className="basis-1/4 edit-label text-center">Имя</label>
          <input name="name" type="text" id="name" className={`basis-3/4 edit-input border-[1px] ${isCorrectName ? "border-white/0" : "border-red-600"}`} defaultValue={nameCurrent} ref={name} onChange={checkName} />
        </div>
        <div className="flex flex-row justify-around justify-items-center items-center">
          <span className="basis-1/4"></span>
          <span className={`basis-3/4 block text-sm text-custom-gray`}>*до 20 букв</span>
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="surname" className="basis-1/4 edit-label text-center">Фамилия</label>
          <input name="surname" type="text" id="surname" className={`basis-3/4 edit-input border-[1px] ${isCorrectSurname ? "border-white/0" : "border-red-600"}`} defaultValue={surnameCurrent} ref={surname} onChange={checkSurname} />
        </div>
        <div className="flex flex-row justify-around justify-items-center items-center">
          <span className="basis-1/4"></span>
          <span className={`basis-3/4 block text-sm text-custom-gray`}>*до 20 букв</span>
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="phone" className="basis-1/4 edit-label text-center">Телефон</label>
          <input name="phone" type="tel" id="phone" className={`basis-3/4 edit-input border-[1px] ${isCorrectPhone ? "border-white/0" : "border-red-600"}`} defaultValue={phoneCurrent} ref={phone} onChange={checkPhone} />
        </div>
        <div className="flex flex-row justify-around justify-items-center items-center">
          <span className="basis-1/4"></span>
          <span className={`basis-3/4 block text-sm text-custom-gray`}>+79*********</span>
        </div>
      </div>
      <div className="mb-2 flex flex-col">
        <div className="flex flex-row justify-around justify-items-center items-center">
          <label htmlFor="email" className="basis-1/4 edit-label text-center">Email</label>
          <input name="email" type="email" id="email" className={`basis-3/4 edit-input border-[1px] ${isCorrectEmail ? "border-white/0" : "border-red-600"}`} defaultValue={emailCurrent} ref={email} onChange={checkEmail} />
        </div>
        <div className="flex flex-row justify-around justify-items-center items-center">
          <span className="basis-1/4"></span>
          <span className={`basis-3/4 block text-sm text-custom-gray`}>***@***.**</span>
        </div>
      </div>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-center w-full px-4 py-2 mb-4 text-base font-medium text-white bg-custom-blue/60 rounded-md">
              <span>Изменить пароль </span>
              <ChevronUpIcon className={`${open ? '' : 'transform rotate-180'} w-6 h-6 text-white`} />
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col">
              <span className={`text-sm text-custom-navy m-2`}>*от 3 до 20 цифр и букв верхнего и нижнего регистра</span>
              <input placeholder="Старый пароль" name="passwordOld" type="password" id="passwordOld" className={`edit-input placeholder:text-custom-gray text-custom-navy  mb-2 border-[1px] ${isCorrectPasswordOld ? "border-white/0" : "border-red-600"}`} ref={passwordOld} onChange={checkPasswordOld} />
              <input placeholder="Новый пароль" name="password" type="password" id="password" className={`edit-input placeholder:text-custom-gray text-custom-navy  mb-2 border-[1px] ${isCorrectPassword ? "border-white/0" : "border-red-600"}`} ref={password} onChange={() => { checkPasswords(); checkPassword() }} />
              <input placeholder="Повторите новый пароль" name="passwordRepeat" type="password" id="passwordRepeat" className={`edit-input placeholder:text-custom-gray text-custom-navy mb-2 border-[1px] ${isCorrectPassword ? "border-white/0" : "border-red-600"}`} ref={passwordRepeat} onChange={checkPasswords} />
              <span className={`block m-2 text-sm font-medium text-red-600 ${areSamePasswords ? "hidden" : "visible"}`}>Пароли не совпадают</span>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <button type="submit" onClick={applyChanges} className="px-4 py-2 my-2 text-white bg-custom-blue font-medium rounded-lg text-base w-full text-center">Сохранить</button>
      <button type="click" onClick={logout} className="px-4 py-2 my-2 text-white bg-custom-blue font-medium rounded-lg text-base w-full text-center">Выйти</button>
    </form>
  );
}

export default EditAdminProfileCard;
