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
    <li className="border rounded-lg flex items-center p-2 gap-4">
      <div className="w-16 h-16 border rounded-full">
        <img className="w-16 h-16 border rounded-full" src={`/photos/${order['Trainer.photo']}`}></img>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-4 ">
          <div className="font-bold">{`${order.startTime}:00-${Number(order.startTime) + 1}:00`}</div>
          <div className="">{`${order.date.split('-')[2]}/${order.date.split('-')[1]}`}</div>
        </div>
        <div className="flex gap-6">
          <div>{`${order['Trainer.name']} ${order['Trainer.surname']}`}</div>
          <div className="text-center grow">{order.sport}</div>
        </div>
        <div>{order['Trainer.phone']}</div>
      </div>
      <button onClick={deleteOrder} className="h-8 w-8 text-white rounded-full bg-purple-500 hover:bg-purple-900 ">Del </button>
    </li >
  )
}

export default UserScheduleCard;
