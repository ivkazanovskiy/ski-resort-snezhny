import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Disclosure } from '@headlessui/react'
import ListboxMonth from '../Listbox/ListboxMonth';
import Day from '../Listbox/Day';
import { useChangeDays } from '../../helpers/useChangeDays'
import axios from 'axios'




function TrainerTimetable(props) {

  // автоматический подсчет даты для текущего месяца
  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth();
  const season = {
    prevYear: (curMonth < 6) ? curYear - 1 : curYear,
    nextYear: (curMonth < 6) ? curYear : curYear + 1,
  }

  const [days, changeDays] = useChangeDays()


  const [month, setMonth] = useState({ id: 9, name: 'Сентябрь', days: 30 },)

  const [currentMonthDays, setCurrentMonthDays] = useState([])

  // FIXME: выглядит как жесткий костыль, но в useEffect не получилось обернуть


  useLayoutEffect(() => {
    const daysArray = []
    for (let day = 1; day <= month.days; day += 1) {
      daysArray.push(day)
    }
    setCurrentMonthDays(daysArray)
    //FIXME:обнуляем счетчик, но надо сделать нормальный стейт в редаксе, чтобы все было видно
    changeDays(0)
  }, [month])

  const saveChanges = () => {
    const data = { days }


    axios({
      url: '/api/setSchedule',
      method: 'PUT',
      data
    })
      .then(res => console.log(res))
      .catch(err => console.error(err))

    console.log(days);
  }

  return (
    <div className="py-4 border border-gray-300 rounded-lg p-2">
      <Disclosure>
        <Disclosure.Button className="flex justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
          <span>Редактирвать расписание</span>
        </Disclosure.Button>
        <Disclosure.Panel >
          <div className="p-2 flex gap-2 text-sm text-gray-500">
            <div className="p-2 text-sm text-gray-500 border border-gray-300 rounded-lg">{`${season.prevYear}/${season.nextYear}`}</div>

            <ListboxMonth setMonth={setMonth} />
          </div>
          <div className="grid grid-cols-7 gap-2 p-2">
            {currentMonthDays.map((day, ind) => <Day key={`${month.name}-${ind}`} day={day} month={month.id} year={(month.id >= 6) ? season.prevYear : season.nextYear} changeDays={changeDays} />)}
          </div>
          <button onClick={saveChanges} className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Сохранить расписание</button>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Button className="flex justify-between w-full px-4 py-2 mb-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
          <span>Посмотреть календарь</span>
        </Disclosure.Button>
        <Disclosure.Panel className="pt-4 mb-2 text-sm text-gray-500">
          <div className="py-4 border border-gray-300 rounded-lg p-2">
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}

export default TrainerTimetable;
