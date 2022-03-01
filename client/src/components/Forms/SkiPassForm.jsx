import { Tab } from '@headlessui/react';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toStringDate } from '../../helpers/toStringDate'
import SkiPassButton from '../Elements/SkiPassButton';
import axios from 'axios'

function SkiPassForm(props) {

  const tableQuery = useQuery('tableQuery', () => axios('/api/skiPass'))
  const save = useMutation((chosen, keyString) => axios({
    url: '/api/skiPass',
    method: 'POST',
    data: {
      typeId: chosen.id,
      skiPass,
      date
    }
  }), {
    onSuccess: () => {
      setModal(false)
      // FIXME: заменить на другое отображение
      window.alert('Ски-пасс куплен')
    },
    onError: (err) => {
      console.log(err.response.data.error);
      window.alert('Ошибка')
    },
  })

  const { auth, skiPass } = useSelector(state => state.userReducer)

  const dateRef = useRef()
  const [modal, setModal] = useState(false)
  const [date, setDate] = useState(toStringDate(new Date()))
  const [type, setType] = useState(0)
  const [chosen, setChosen] = useState()
  const [amountHours, setAmountHours] = useState(0)
  const [amountPasses, setAmountPasses] = useState(0)
  // 0 - взрослый, 1 - детский
  const [age, setAge] = useState(0)

  const day = (new Date(date)).toString().split(' ')[0]
  const dayPrefix = (day === 'Sun' || day === 'Sat') ? 'weekEnd' : 'weekDay'
  const agePostfix = (age === 0) ? 'Old' : 'Young'
  const keyString = dayPrefix + agePostfix

  useEffect(() => {
    if (tableQuery.isSuccess) {
      type === 0 ?
        setChosen(tableQuery.data.data[amountPasses])
        :
        // TODO: сделать динамический учет количества опций по проходам
        setChosen(tableQuery.data.data[amountHours + 4])
    }
  }, [type, tableQuery, amountPasses, amountHours, age])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  if (!auth) return (
    <>
      <div className="w-3/4 mt-6">Для покупки Ski-Pass войдите в свой профиль или зарегистрируйтесь</div>
      <div className="flex p-2 gap-2 w-full">
        <Link to="/login" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm flex-1 px-5 py-2.5 text-center ">Войти</Link>
        <Link to="/registration" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm flex-1 px-5 py-2.5 text-center ">Зарегистрироваться</Link>
      </div>
    </>)

  if (!skiPass) return (
    <>
      <div className="w-3/4 mt-6">Для пополнения Ski-Pass необходимо купить его в кассе Горнолыжного курорта Снежный и добавить в личном кабинете в разделе "Информация"</div>
      <Link to="/profile" type="submit" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center ">Личный кабинет</Link>
    </>
  )

  if (tableQuery.isLoading) return (
    <>
      Загрузка
    </>
  )

  if (chosen) return (
    <>
      <div className="flex gap-6 mt-6 p-2">
        Выберите день:
        <input type="date" ref={dateRef} onChange={() => setDate(dateRef.current.value)} defaultValue={date} />
      </div>
      <Tab.Group onChange={setAge} defaultIndex={age}>
        <Tab.List className="flex w-full mb-2 self-stretch p-1 space-x-1 bg-blue-900/20 rounded-xl">
          <Tab className={({ selected }) =>
            classNames(
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            )
          } >
            Взрослый
          </Tab>
          <Tab className={({ selected }) =>
            classNames(
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            )
          } >
            Детский
          </Tab>
        </Tab.List>
      </Tab.Group>
      <Tab.Group onChange={setType} defaultIndex={type}>
        <Tab.List className="flex self-stretch p-1 space-x-1 bg-blue-900/20 rounded-xl">
          <Tab className={({ selected }) =>
            classNames(
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            )
          } >
            Количество проходов
          </Tab>
          <Tab className={({ selected }) =>
            classNames(
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            )
          }>Количество часов</Tab>
        </Tab.List>
        <Tab.Panels className="mt-2 w-full">
          <Tab.Panel className={classNames(
            'flex bg-white rounded-md',
            'flex focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}>
            <Tab.Group onChange={setAmountPasses} defaultIndex={amountPasses} >
              <Tab.List className="flex w-full self-stretch p-1 space-x-1 bg-blue-900/20 rounded-xl">
                {tableQuery.data.data.filter(obj => obj.type === 'pass').map(pass => <SkiPassButton key={pass.id} data={pass} />)}
              </Tab.List>
            </Tab.Group>
          </Tab.Panel>
          <Tab.Panel className={classNames(
            'flex bg-white rounded-md',
            'flex focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}>
            <Tab.Group onChange={setAmountHours} defaultIndex={amountHours}>
              <Tab.List className="flex w-full self-stretch p-1 space-x-1 bg-blue-900/20 rounded-xl">
                {tableQuery.data.data.filter(obj => obj.type === 'hour').map(hour => <SkiPassButton key={hour.id} data={hour} />)}
              </Tab.List>
            </Tab.Group>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <div className="p-4 border rounded-lg w-full">{chosen[keyString]}</div>
      <button onClick={() => setModal(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Оплатить</button>

      {modal &&
        <>
          <div className="absolute mt-10 flex flex-col w-3/4 h-1/2 bg-white border rounded-lg p-2">
            <div className="grow  m-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 animate-ping" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex  gap-2">
              <button onClick={() => setModal(false)} className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Закрыть</button>
              <button onClick={() => save.mutate(chosen, keyString)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Оплатить</button>
            </div>
          </div>
        </>
      }

    </>
  )

  return (
    <>

    </>
  );
}

export default SkiPassForm;