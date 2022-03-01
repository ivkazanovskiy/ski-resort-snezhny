import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useParams } from 'react-router-dom'

import { countGapValue } from '../../helpers/countGapValue';
import { countCost } from '../../helpers/countCost'
import { nextStringDate } from '../../helpers/nextStringDate';
import { toStringDate } from '../../helpers/toStringDate';
import Slider from '../Elements/Slider';
import axios from 'axios'
import ModalBuy from '../Modals/ModalBuy';

function RoomsSearch(props) {

  const { type } = useParams()
  const startRef = useRef()
  const roomRef = useRef()
  const finishRef = useRef()
  const queryClient = useQueryClient()

  //  FIXME: попробовать заменить стейты на переменные, чтобы уменьшить количество переменных
  const [startDate, setStartDate] = useState(nextStringDate(toStringDate(new Date()), 1))
  const [gap, setGap] = useState(1)
  const [finishDate, setFinishDate] = useState(nextStringDate(startDate, gap))

  const [modal, setModal] = useState(false)

  // назначаем заголовки вне useQuery, так как не нашел способа дождаться изменения стейта finishDate
  axios.defaults.headers.common['start'] = startDate
  axios.defaults.headers.common['finish'] = finishDate
  axios.defaults.headers.common['type'] = type

  // подгружаем список свободных коттеджей/домов по выбранным датам
  const avaliableRooms = useQuery('avaliableRooms', () => axios('/api/avaliable'))
  // подгружаем описание данного типа
  const typeInfo = useQuery('typeInfo', () => axios(`/api/types/${type}`))

  const dookDays = useMutation(() => axios({
    url: '/api/avaliable',
    method: 'POST',
    data: {
      start: startDate,
      days: gap,
      roomId: Number(roomRef.current.value)
    }
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries('avaliableRooms')
      setModal(false)
      window.alert('Оплата прошла успешно')
    },
    onError: (error) => window.alert(error.response.data.error),
  })

  // когда подгружится запрос в avaliable ставим список всех доступных номеров/домов
  let avaliable;
  if (avaliableRooms.isSuccess) avaliable = avaliableRooms.data.data.sort((a, b) => a - b)

  let thisType;
  let cost;
  if (typeInfo.isSuccess) {
    // когда подгружится запрос по типу дома, заполняем данные 
    thisType = typeInfo.data.data;
    // когда подгружится запрос по типу дома, пересчитываем стоимость 
    cost = countCost(startDate, gap, thisType.weekdayCost, thisType.weekendCost)
  }

  // при изменении старта финиш тоже меняется, на основании выбранного количества дней
  useEffect(() => {
    setFinishDate(nextStringDate(startDate, gap))
    finishRef.current.value = nextStringDate(startDate, gap)
  }, [startDate, gap])

  // когда финиш изменился мы можем на основании старта и финиша отпаравить новый запрос
  useEffect(() => {
    queryClient.invalidateQueries('avaliableRooms')
  }, [finishDate, queryClient])

  return (
    <>
      <div>

      </div>
      <div className="flex flex-col border w-full gap-2">
        {/* FIXME: сделать подгрузку куртинок */}
        {/* < div className="w-full h-60 bg-cyan-100 text-center " > {thisType ? thisType.images : 'Загрузка...'} </div > */}
        < div className="w-full h-60 bg-cyan-100 text-center " ><Slider type={type} /></div >
        <h1 className="w-full text-xl "> {thisType ? thisType.title : 'Загрузка...'}</h1>
        <h2 className="w-full text-md ">{thisType ? thisType.description : 'Загрузка...'}</h2>
        <div className="">Количество человек для размещения: {thisType ? thisType.guestCount : 'Загрузка...'}</div>
        <div className="">Стоимость буднего дня: {thisType ? thisType.weekdayCost : 'Загрузка...'}</div>
        <div className="">Стоимость выходного дня: {thisType ? thisType.weekendCost : 'Загрузка...'}</div>
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
        <div className="flex">
          <div className="flex flex-col flex-1">
            <div className="">Выбранно {countGapValue(startDate, finishDate)} дней </div>
            {/* Пока грузится */}
            {avaliableRooms.isLoading && <span>Загрузка...</span>}
            {
              avaliableRooms.isSuccess && ((avaliable.length > 0) ?
                <select name="select" className="w-40" ref={roomRef}>
                  {avaliable.map(id => <option value={id} key={id}>{id}</option>)}
                </select>
                :
                <select name="select" className="w-40" ref={roomRef} disabled>
                  <option> Свободных номеров нет</option>
                </select>
              )
            }
          </div>
          <div className="flex-1 text-center">
            Стоимость: {cost}
          </div>
        </div>
        <button onClick={() => setModal(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Забронировать</button>
        {modal && <ModalBuy setModal={setModal} mutation={dookDays} cost={cost}/>}

      </div >
    </>

  );
}

export default RoomsSearch;
