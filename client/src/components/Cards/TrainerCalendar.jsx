import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { addZero } from '../../helpers/addZero';
import TrainerCustomerCard from './TrainerCustomerCard';

function TrainerCalendar({ workingHours }) {
  const currentDate = new Date()
  const todayStringDay = addZero(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate())
  const [chosenDate, setChosenDate] = useState(todayStringDay)

  const dateRef = useRef()

  return (
    <div className="py-4 border border-gray-300 rounded-lg p-2">
      <input type="date" ref={dateRef} onChange={() => setChosenDate(dateRef.current.value)} defaultValue={todayStringDay} />
      <ul className="flex flex-col gap-2">
        {workingHours.filter(order => order.date === chosenDate).map(info => <TrainerCustomerCard key={`${info.date}-${info.startTime}`} info={info} />)}
      </ul>
    </div>
  );
}

export default TrainerCalendar;
