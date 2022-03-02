import React, { useState, useRef } from 'react';

//FIXME: доделать reactQuery
import { useQuery } from 'react-query'
import axios from 'axios'
import { addZero } from '../../helpers/addZero';

import TrainerCustomerCard from './TrainerCustomerCard';

function TrainerTimetable(props) {

  const dateRef = useRef();

  const allRecords = useQuery('allRecords', () => axios({ url: '/api/trainerSchedule' }))

  let workingHours;
  if (allRecords.isSuccess) {
    workingHours = allRecords.data.data.schedule.filter(record => record['User.name']);
  }

  const currentDate = new Date()
  const todayStringDay = addZero(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())
  const [chosenDate, setChosenDate] = useState(todayStringDay)

  return (
    <>
      {allRecords.isLoading && <>Загрузка</>}
      {allRecords.isSuccess &&
        <>
          <div className="w-full">
            <ul className="flex flex-col gap-2">
              {workingHours.filter(order => order.date === chosenDate).map(info => <TrainerCustomerCard key={`${info.date}-${info.startTime}`} info={info} />)}
            </ul>
          </div>
          <div className="flex justify-center mt-2 w-full gap-2">
            <input type="date" className="w-1/2 date-input" ref={dateRef} onChange={() => setChosenDate(dateRef.current.value)} defaultValue={todayStringDay} />
          </div>

        </>}
    </>
  );
}

export default TrainerTimetable;
