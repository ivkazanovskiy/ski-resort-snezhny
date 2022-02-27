import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useQuery } from 'react-query'
import { countGapValue } from '../../helpers/countGapValue';
import { nextStringDate } from '../../helpers/nextStringDate';
import { toStringDate } from '../../helpers/toStringDate';
import axios from 'axios'

function RoomsSearch(props) {

  const startRef = useRef()
  const finishRef = useRef()

  const [startDate, setStartDate] = useState(toStringDate(new Date()))
  const [gap, setGap] = useState(2)
  let finishDate = (nextStringDate(startDate, gap))


  const avaliableRooms = useQuery('avaliableRooms', axios({
    url: '/api/avaliable',
    headers: {
      start: startDate,
      finish: finishDate
    }
  }))

  useEffect(() => {
    finishDate = (nextStringDate(startDate, gap))
    finishRef.current.value = nextStringDate(startDate, gap)
  }, [startDate, gap])

  return (
    <div className="flex flex-col border w-full gap-2">
      <div className="w-full h-60 bg-cyan-100 text-center "> тут карусель картинок </div>
      <h1 className="w-full text-xl "> Тут будет краткое описание, типа: Номер Стандарт </h1>
      <h2 className="w-full text-md "> Тут будет более подробное описание, типа:Классический номер гостиницы выполнен в спокойном лаконичном стиле скандинавского минимализма, уютный продуманный интерьер для двухместного размещения</h2>
      <div className="">Количество человек для размещения</div>
      <div className="">Стоимость буднего дня</div>
      <div className="">Стоимость выходного дня</div>

      <div className="flex justify-around">
        <label htmlFor="start" className="flex flex-col gap-1">
          <div>Заезд</div>
          <input type="date" id="start" defaultValue={startDate} ref={startRef} onChange={() => setStartDate(startRef.current.value)} />
        </label>

        <label htmlFor="start" className="flex flex-col gap-1">
          <div>Выезд</div>
          <input type="date" id="finish" defaultValue={finishDate} min={nextStringDate(startDate, 1)} ref={finishRef} onChange={() => setGap(countGapValue(startDate, (finishRef.current.value)))} />
        </label>
      </div>
      <div className="">Выбранно {countGapValue(startDate, finishDate)} дней </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Забронировать</button>
    </div>
  );
}

export default RoomsSearch;
