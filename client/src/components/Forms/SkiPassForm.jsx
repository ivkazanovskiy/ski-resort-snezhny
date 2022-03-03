import { Tab } from '@headlessui/react';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toStringDate } from '../../helpers/toStringDate'
import SkiPassButton from '../Elements/SkiPassButton';
import axios from 'axios'
import ModalBuy from '../Modals/ModalBuy';

import bill from '../../css/svg/bill.svg'
import UnauthorizedCard from '../Cards/UnauthorizedCard';

function SkiPassForm(props) {

  const { role } = useSelector(state => state.userReducer);

  const tableQuery = useQuery('tableQuery', () => axios('/api/skiPass'))
  const save = useMutation(() => axios({
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

  if (!role) return (<UnauthorizedCard />)

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
      <div className="w-full pt-16 grow flex justify-center items-center ">
        <div className="p-4 mb-2 flex flex-col items-center rounded-lg w-60 backdrop-blur-sm bg-white/80">
          <div className="self-end">
            № {skiPass}
          </div>
          <div className="mt-4">
            Итого к оплате:
          </div>
          <div className="text-2xl font-medium">
            {chosen[keyString]} ₽
          </div>
        </div>
      </div>

      <div className="backdrop-blur-sm bg-white/40 w-full rounded-lg">
        <Tab.Group onChange={setType} defaultIndex={type}>
          <Tab.Panels className="self-stretch">
            <Tab.Panel className="slider-panel">
              <Tab.Group onChange={setAmountPasses} defaultIndex={amountPasses} >
                <Tab.List className="slider-list-skipass">
                  {tableQuery.data.data.filter(obj => obj.type === 'pass').map(pass => <SkiPassButton key={pass.id} data={pass} />)}
                </Tab.List>
              </Tab.Group>
            </Tab.Panel>
            <Tab.Panel className="slider-panel">
              <Tab.Group onChange={setAmountHours} defaultIndex={amountHours}>
                <Tab.List className="slider-list-skipass grow">
                  {tableQuery.data.data.filter(obj => obj.type === 'hour').map(hour => <SkiPassButton key={hour.id} data={hour} />)}
                </Tab.List>
              </Tab.Group>
            </Tab.Panel>
          </Tab.Panels>
          <Tab.List className="slider-list-skipass">
            <Tab className={({ selected }) => classNames('slider-tab',
              selected
                ? 'slider-active'
                : 'slider-passive'
            )}
            >
              Количество проходов
            </Tab>
            <Tab className={({ selected }) => classNames('slider-tab',
              selected
                ? 'slider-active'
                : 'slider-passive'
            )}
            >
              Количество часов
            </Tab>
          </Tab.List>
        </Tab.Group>
        <Tab.Group onChange={setAge} defaultIndex={age}>
          <Tab.List className="slider-list-skipass">
            <Tab className={({ selected }) => classNames('slider-tab',
              selected
                ? 'slider-active'
                : 'slider-passive'
            )}
            >
              Взрослый
            </Tab>
            <Tab className={({ selected }) => classNames('slider-tab',
              selected
                ? 'slider-active'
                : 'slider-passive'
            )}
            >
              Детский
            </Tab>
          </Tab.List>
        </Tab.Group>
      </div>
      <div className="flex mt-2 w-full gap-2">
        <input type="date" className="w-1/2 date-input" ref={dateRef} onChange={() => setDate(dateRef.current.value)} defaultValue={date} />
        <button onClick={() => setModal(true)} className="basic-btn  w-1/2">Оплатить</button>
        {modal && <ModalBuy setModal={setModal} mutation={save} cost={chosen[keyString]} />}
      </div>

    </>
  )

  return (
    <>

    </>
  );
}

export default SkiPassForm;
