import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { countGapValue } from '../../helpers/countGapValue';
import { nextStringDate } from '../../helpers/nextStringDate';
import { toStringDate } from '../../helpers/toStringDate';
import axios from 'axios'

function RoomsSearch(props) {

  const startRef = useRef()
  const roomRef = useRef()
  const finishRef = useRef()
  const queryClient = useQueryClient()
  const [startDate, setStartDate] = useState(nextStringDate(toStringDate(new Date()), 1))
  const [gap, setGap] = useState(1)

  // TODO: возможно стоит заменить не переменную
  const [finishDate, setFinishDate] = useState(nextStringDate(startDate, gap))

  axios.defaults.headers.common['start'] = startDate
  axios.defaults.headers.common['finish'] = finishDate
  //   // FIXME: сделать из req.params
  axios.defaults.headers.common['type'] = 1

  const { isSuccess, isLoading, data } = useQuery('avaliableRooms', () => axios('/api/avaliable'))
  let avaliable;

  const dookDays = useMutation(() => axios({
    url: '/api/avaliable',
    method: 'POST',
    data: {
      start: startDate,
      days: gap,
      roomId: Number(roomRef.current.value)
    }
  }), {
    onSuccess: () => queryClient.invalidateQueries('avaliableRooms'),
    onError: (error) => window.alert(error.response.data.error),
  })


  if (isSuccess) avaliable = data.data.sort((a, b) => a - b)

  useLayoutEffect(() => {
    setFinishDate(nextStringDate(startDate, gap))
    finishRef.current.value = nextStringDate(startDate, gap)
  }, [startDate, gap])


  useEffect(() => {
    queryClient.invalidateQueries('avaliableRooms')
  }, [finishDate])


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
          <input type="date" id="start" defaultValue={startDate} ref={startRef} min={toStringDate(new Date())} onChange={() => setStartDate(startRef.current.value)} />
        </label>

        <label htmlFor="start" className="flex flex-col gap-1">
          <div>Выезд</div>
          <input type="date" id="finish" defaultValue={finishDate} min={nextStringDate(startDate, 1)} ref={finishRef} onChange={() => setGap(countGapValue(startDate, (finishRef.current.value)))} />
        </label>
      </div>
      <div className="">Выбранно {countGapValue(startDate, finishDate)} дней </div>
      {/* Пока грузится */}
      {isLoading && <span>Загрузка...</span>}
      {isSuccess && ((avaliable.length > 0) ?
        <select name="select" className="w-40" ref={roomRef}>
          {avaliable.map(id => <option value={id} key={id}>{id}</option>)}
        </select>
        :
        <select name="select" className="w-40" ref={roomRef} disabled>
          <option> Свободных номеров нет</option>
        </select>
      )
      }

      <button onClick={dookDays.mutate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Забронировать</button>
    </div >
  );
}

export default RoomsSearch;
