import React, { useState } from 'react';

//FIXME: доделать reactQuery
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { Disclosure } from '@headlessui/react'
import axios from 'axios'

import ListboxMonth from '../Listbox/ListboxMonth';
import TrainerCalendar from './TrainerCalendar';
import Day from '../Listbox/Day';

import { addZero } from '../../helpers/addZero'
import { getDates } from '../../helpers/getDates'



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

  // автоматический подсчет даты для текущего месяца
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth() + 1;
  const season = {
    prevYear: (curMonth < 6) ? curYear - 1 : curYear,
    nextYear: (curMonth < 6) ? curYear : curYear + 1,
  }

  const [month, setMonth] = useState(months.find(month => month.id === curMonth))


  const daysArray = []
  for (let day = 1; day <= month.days; day += 1) {
    daysArray.push(addZero(
      (month > 6) ? season.prevYear : season.nextYear,
      month.id,
      day
    ))
  }

  const queryClient = useQueryClient()
  // FIXME: сделать только на выбранный месяц или оставить как есть на весь сезон
  const allRecords = useQuery('allRecords', () => axios({ url: '/api/trainerSchedule' }))

  const saveRecords = useMutation(() => axios({
    url: '/api/trainerSchedule',
    method: 'PUT',
    data: { days: workingDays }
  })
    , { onSuccess: () => queryClient.invalidateQueries('allRecords') })

  let workingDays;
  let workingHours;
  if (allRecords.isSuccess) {
    workingDays = getDates(allRecords.data.data.schedule)
    workingHours = allRecords.data.data.schedule.filter(record => record['User.name'])
  }

  const changeDays = (day) => {
    (workingDays.includes(day))
      ?
      workingDays = workingDays.filter(el => el !== day)
      :
      workingDays.push(day);
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

          {/* FIXME: сделать смещение, чтобы выходные были в конце */}
          <div className="grid grid-cols-7 gap-2 p-2">
            {allRecords.isLoading && <>Загрузка</>}
            {allRecords.isSuccess && daysArray.map((date, ind) => <Day key={date} date={date} changeDays={changeDays} isMarked={workingDays.includes(date)} />)}
          </div>
          <button onClick={saveRecords.mutate} className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Сохранить расписание</button>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Button className="flex justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
          <span>Посмотреть записи</span>
        </Disclosure.Button>
        <Disclosure.Panel className="pt-4 mb-2 text-sm text-gray-500">
          {allRecords.isLoading && <>Загрузка</>}
          {allRecords.isSuccess && <TrainerCalendar workingHours={workingHours}></TrainerCalendar>}
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}

export default TrainerTimetable;
