import React, { useState, useEffect, useLayoutEffect } from 'react';

//FIXME: доделать reactQuery
// import { useQuery, useQueryClient } from 'react-query'
import { Disclosure } from '@headlessui/react'
import axios from 'axios'

import ListboxMonth from '../Listbox/ListboxMonth';
import TrainerCalendar from './TrainerCalendar';
import Day from '../Listbox/Day';

import { useChangeDays } from '../../helpers/useChangeDays'
import { getDataFromObjects } from '../../helpers/getDataFromObjects'



function TrainerTimetable(props) {

  // TODO: пофиксить количество дней в феврале
  const months = [
    { id: 9, name: 'Сентябрь', days: 30 },
    { id: 10, name: 'Октябрь', days: 31 },
    { id: 11, name: 'Ноябрь', days: 30 },
    { id: 12, name: 'Декабрь', days: 31 },
    { id: 1, name: 'Январь', days: 31 },
    { id: 2, name: 'Февраль', days: 28 },
    { id: 3, name: 'Март', days: 31 },
    { id: 4, name: 'Апрель', days: 30 },
  ]


  //FIXME: доделать reactQuery
  // const queryClient = useQueryClient()
  // автоматический подсчет даты для текущего месяца
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth() + 1;
  const season = {
    prevYear: (curMonth < 6) ? curYear - 1 : curYear,
    nextYear: (curMonth < 6) ? curYear : curYear + 1,
  }

  // TODO: флажек для отлавливания сохранений переделать axios с useEffect на react query
  const [refresh, setRefresh] = useState(false)
  const [savedHours, setSavedHours] = useState([])
  const [busyDays, changeDays] = useChangeDays()
  const [busyHours, setBusyHours] = useState()
  const [month, setMonth] = useState(months.find(month => month.id === curMonth))
  const [currentMonthDays, setCurrentMonthDays] = useState([])

  useLayoutEffect(() => {
    const daysArray = []
    for (let day = 1; day <= month.days; day += 1) {
      daysArray.push(day)
    }
    setCurrentMonthDays(daysArray)
  }, [month])


  //FIXME: доделать reactQuery
  // const actualResponse = useQuery('updateHours', () => axios({ url: '/api/trainerSchedule' }))

  // FIXME: сделать только на выбранный месяц или оставить как есть
  // достаем существующее расписание
  useEffect(() => {
    axios({
      url: '/api/trainerSchedule',
    })
      .then(response => {
        const { schedule: scheduleObjects } = response.data
        setSavedHours(scheduleObjects)
        changeDays(getDataFromObjects(scheduleObjects))
        setBusyHours(scheduleObjects.filter(obj => obj.sport))
      })
      .catch(err => console.error(err))
    // TODO: переделать на react query
  }, [refresh])

  const saveChanges = () => {
    const data = { days: busyDays }
    axios({
      url: '/api/trainerSchedule',
      method: 'PUT',
      data
    })
      .then(response => {
        setRefresh(!refresh)
        //FIXME: доделать reactQuery
        // queryClient.invalidateQueries('updateHours')
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="py-4 border border-gray-300 rounded-lg p-2">
      <Disclosure>
        <Disclosure.Button className="flex justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
          <span>Редактирвать расписание</span>
        </Disclosure.Button>
        {/* TODO: вынести в отдельный компонент Trainer Schedule */}
        <Disclosure.Panel >
          <div className="p-2 flex gap-2 text-sm text-gray-500">
            <div className="p-2 text-sm text-gray-500 border border-gray-300 rounded-lg">{`${season.prevYear}/${season.nextYear}`}</div>

            <ListboxMonth setMonth={setMonth} months={months} />
          </div>
          <div className="grid grid-cols-7 gap-2 p-2">
            {currentMonthDays.map((day, ind) => <Day key={`${month.name}-${ind}`} savedHours={savedHours} day={day} month={month.id} year={(month.id >= 6) ? season.prevYear : season.nextYear} changeDays={changeDays} />)}
          </div>
          <button onClick={saveChanges} className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Сохранить расписание</button>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Button className="flex justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
          <span>Посмотреть записи</span>
        </Disclosure.Button>
        <Disclosure.Panel className="pt-4 mb-2 text-sm text-gray-500">
          <TrainerCalendar busyHours={busyHours}></TrainerCalendar>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}

export default TrainerTimetable;
