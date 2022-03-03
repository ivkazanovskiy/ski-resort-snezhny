import React, { useEffect, useState } from 'react';
import { nextStringDate } from '../../helpers/nextStringDate'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

function OrderCard({ orders }) {

  const [orderInfo, setOrderInfo] = useState({});
  const [photo, setPhoto] = useState();

  const queryClient = useQueryClient()

  const save = useMutation(() => axios({
    url: '/api/userOrders',
    method: 'DELETE',
    data: { ids }
  }), {
    onSuccess: () => queryClient.invalidateQueries('allCards'),
    onError: (err) => console.log(err.response.data)
  })

  const startDateString = orders[0].start
  const finishDateString = nextStringDate(orders[orders.length - 1].start, 1)
  const ids = orders.map(order => order.id)

  const startDate = new Date(startDateString);
  const finishDate = new Date(finishDateString);

  let showStartDay = String(startDate.getDate());
  let showStartMonth = String(startDate.getMonth() + 1);
  let showFinishDay = String(finishDate.getDate());
  let showFinishMonth = String(finishDate.getMonth() + 1);

  if (showStartDay.length === 1) showStartDay = `0${showStartDay}`;
  if (showStartMonth.length === 1) showStartMonth = `0${showStartMonth}`;
  if (showFinishDay.length === 1) showFinishDay = `0${showFinishDay}`;
  if (showFinishMonth.length === 1) showFinishMonth = `0${showFinishMonth}`;


  useEffect(() => {
    axios({
      url: `/api/rooms/${orders[0].roomId}`,
    })
      .then(res => setOrderInfo(res.data.room))
      .catch(err => err.message)
  }, [])

  useEffect(() => {
    axios({
      url: '/api/photos/',
      method: 'GET',
      headers: {
        folder: `/rooms/${orderInfo['Type.images']}`,
      },
    })
      .then((res) => setPhoto(res.data.photos[0]))
      .catch(err => console.log(err));
  }, [orderInfo])

  return (
    <>
      <li>
        <div className="card">
          <div className="card-avatar relative">
            <div className="absolute w-8 h-8 bg-custom-navy/60 rounded-lg bottom-0 right-0 text-white flex items-center justify-center">
              <p className="">{orders[0].roomId}</p>
            </div>
            {
              photo
                ? <img className="w-full h-full object-cover rounded-lg" src={`/rooms/${orderInfo['Type.images']}/${photo}`}></img>
                : <img className="w-full h-full object-cover rounded-lg" src="https://brilliant24.ru/files/cat/template_01.png"></img>
            }
          </div>
          <div className="card-content">
            <div className="card-name">
              {orderInfo['Type.title']}
            </div>
            <div className="card-info">
              {`${showStartDay}.${showStartMonth}-${showFinishDay}.${showFinishMonth}`}
            </div>
          </div>
          <div className="card-delete">
            {save.isIdle &&
              <button onClick={() => save.mutate()} className="delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#212D52">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>}

            {save.isLoading &&
              <button className="delete-btn animate-ping">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#212D52">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>}

          </div>
        </div>
      </li>
    </>
  );
}

export default OrderCard;
