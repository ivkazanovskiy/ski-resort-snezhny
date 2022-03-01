import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function UserScheduleCard({ order, setOrders, orders }) {

  const [photos, setPhotos] = useState('');

  useEffect(() => {
    axios({
      url: '/api/photos/',
      method: 'GET',
      headers: {
        folder: '/photos',
      },
    })
      .then((res) => {
        console.log(res.data.photos);
        setPhotos(res.data.photos);
      })
      .catch(err => console.log(err));
  }, [orders])

  const deleteOrder = (event) => {
    event.preventDefault();

    axios({
      url: '/api/userSchedule',
      method: 'DELETE',
      data: {
        date: order.date,
        startTime: order.startTime,
        trainerId: order['Trainer.id'],
      },
    })
      .then(() => {
        // FIXME: сюда надо закинуть рефреш, чтобы обновить список инструкторов
        setOrders(orders.filter(el => !(
          (el['Trainer.id'] === order['Trainer.id'])
          && (el.date === order.date)
          && (el.startTime === order.startTime)
        )));
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <li>
        <div className="card">
          <div class="col-span-2 border-2 border-gray-600">
            <img className="card-avatar" src={`/photos/${order['Trainer.photo']}`} alt="..."></img>
          </div>
          <div className="col-span-3 border-2 border-gray-600 grid grid-rows-4">
            <div className="border-2 border-red-600">
              {`${order.date.split('-')[2]}.${order.date.split('-')[1]}`}
            </div>
            <div className="border-2 border-red-600">
              {`${order.startTime}:00-${Number(order.startTime) + 1}:00`}
            </div>

            <div className="border-2 border-red-600">
              {order['Trainer.phone']}
            </div>
            <div className="border-2 border-red-600">
              {`${order['Trainer.name']} ${order['Trainer.surname']}`}
            </div>
          </div>
          <div className="border-2 border=gray-600"><button onClick={deleteOrder} className="h-8 w-8 text-white rounded-full bg-purple-500 hover:bg-purple-900 ">Del </button></div>
        </div>
      </li>
    </>
  )
}

export default UserScheduleCard;
