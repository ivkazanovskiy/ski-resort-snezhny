
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

import ListboxMonth from '../Listbox/ListboxMonth'
import Day from '../Listbox/Day'
import { addZero } from '../../helpers/addZero'
import { getDates } from '../../helpers/getDates'


function CalendarTrainer(props) {

  const curYear = new Date().getFullYear();
  const curMonth = new Date().getMonth() + 1;
  const season = {
    prevYear: (curMonth < 6) ? curYear - 1 : curYear,
    nextYear: (curMonth < 6) ? curYear : curYear + 1,
  }

  const months = [
    { id: 9, name: 'Сентябрь', days: 30 },
    { id: 10, name: 'Октябрь', days: 31 },
    { id: 11, name: 'Ноябрь', days: 30 },
    { id: 12, name: 'Декабрь', days: 31 },
    { id: 1, name: 'Январь', days: 31 },
    { id: 2, name: 'Февраль', days: (season.nextYear % 4 === 0) ? 29 : 28 },
    { id: 3, name: 'Март', days: 31 },
    { id: 4, name: 'Апрель', days: 30 },
  ]



  const [month, setMonth] = useState(months.find(month => month.id === curMonth))

  const daysArray = []
  for (let day = 1; day <= month.days; day += 1) {
    daysArray.push(addZero(
      (month > 6) ? season.prevYear : season.nextYear,
      month.id,
      day
    ))
  }

  const shiftDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const firstWeekDay = (new Date(daysArray[0])).toString().split(' ')[0]
  const shiftAmount = shiftDays.indexOf(firstWeekDay)
  const pseudoArr = []
  for (let i = 0; i < shiftAmount; i += 1)  pseudoArr.push(1)




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
    <div className="flex flex-col gap-2 w-full">
      {/* FIXME: сделать смещение, чтобы выходные были в конце */}
      <div className="grid grid-cols-7 gap-2 w-full">
        {pseudoArr.map((el, ind) => <div key={`pseudo-${ind}`} className=""></div>)}
        {allRecords.isLoading && <>Загрузка</>}
        {allRecords.isSuccess && daysArray.map((date) => <Day key={`${date}-btn`} date={date} changeDays={changeDays} isMarked={workingDays.includes(date)} />)}
      </div>
      <div className="w-full flex gap-2">
        <div className="p-2 text-center rounded-lg text-custom-navy backdrop-blur-sm bg-white/80">
          {`${season.prevYear}/${season.nextYear}`}
        </div>
        <ListboxMonth setMonth={setMonth} months={months} />
      </div>
      <button onClick={saveRecords.mutate} className="basic-btn w-full">Сохранить расписание</button>
    </div>
  );
}

export default CalendarTrainer;
