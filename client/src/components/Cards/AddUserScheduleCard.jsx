
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import axios from 'axios';

import NewScheduleCard from './NewScheduleCard';
import { toStringDate } from '../../helpers/toStringDate';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ListboxTrainers from '../Listbox/ListboxTrainers';
import { useChangeHours } from '../../helpers/useChangeHours';
import UnauthorizedCard from './UnauthorizedCard';


function AddUserScheduleCard() {

  const dateRef = useRef()
  const [selectedTrainer, setSelectedTrainer] = useState({})
  const [hours, setHours] = useChangeHours()
  const [date, setDate] = useState(toStringDate(new Date()))
  const [sportInd, setSportInd] = useState(0)
  const sport = ['snowboard', 'ski'][sportInd]

  const queryClient = useQueryClient()

  const allTrainersQuery = useQuery(`allTrainers-${sport}-${date}`, () => axios({
    url: '/api/trainers/',
    method: 'GET',
    headers: {
      'sport': sport,
      'bookingdate': date,
    },
  }))

  useEffect(() => setHours(0), [sportInd, date])

  const saveSchedule = useMutation(() => axios({
    url: '/api/userSchedule',
    method: 'POST',
    data: {
      trainerId: selectedTrainer.id,
      date,
      sport: (sport === 'ski') ? 'Лыжи' : 'Сноуборд',
      hours,
    }
  }), {
    onSuccess: () => {
      setHours(0)
      queryClient.invalidateQueries(`allTrainers-${sport}-${date}`)
    }
  })

  let allTrainers;
  if (allTrainersQuery.isSuccess) allTrainers = allTrainersQuery.data.data

  const { role } = useSelector(state => state.userReducer);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  if (!role) return (<UnauthorizedCard />)

  return (
    <div className="w-full">

      {allTrainersQuery.isLoading && 'Загрузка'}
      {allTrainersQuery.isSuccess && (
        allTrainers.length > 0 ?

          <NewScheduleCard allTrainers={allTrainers} date={date} setHours={setHours} selectedTrainer={selectedTrainer} setSelectedTrainer={setSelectedTrainer} />
          // < ListboxTrainers freeTrainers={freeTrainers} />
          :
          <div className="p-2 text-base rounded-lg w-full backdrop-blur-sm bg-white/60">Свободных инструкторов нет</div>
      )}
      <Tab.Group onChange={setSportInd} defaultIndex={sportInd}>
        <Tab.List className="slider-list mt-2">
          <Tab className={({ selected }) =>
            classNames(
              'slider-tab',
              selected
                ? 'slider-active'
                : 'slider-passive'
            )
          } >Сноуборд</Tab>
          <Tab className={({ selected }) =>
            classNames(
              'slider-tab',
              selected
                ? 'slider-active'
                : 'slider-passive'
            )
          }>Горные лыжи</Tab>
        </Tab.List>
      </Tab.Group>
      <div className="flex mt-2 w-full gap-2">
        <input type="date" className="w-1/2 date-input" ref={dateRef} onChange={() => setDate(dateRef.current.value)} defaultValue={date} />
        <button onClick={() => {
          console.log(hours, selectedTrainer);
          saveSchedule.mutate()
        }} className="basic-btn  w-1/2">Записаться</button>
      </div>
    </div>
  )
}

export default AddUserScheduleCard;
