import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function UserScheduleCard({ order, setOrders, orders }) {

  const [photos, setPhotos] = useState('');

  useEffect(() => {
    console.log(5);
    axios({
      url: '/api/photos/',
      method: 'GET',
      headers: {
        folder: '/photos',
      },
    })
      .then((res) => setPhotos(res.data.photos))
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
    <li>
      <div className="card">
        <img className="card-avatar" src={`/photos/${order['Trainer.photo']}`} alt="..."></img>
        <div className="card-content">
          <div className="card-name">
            {`${order['Trainer.name']} ${order['Trainer.surname']}`}
          </div>
          <div className="card-info">
            {order['Trainer.phone']}
          </div>
          <div className="card-info">
            {`${order.date.split('-')[2]}.${order.date.split('-')[1]} ${order.startTime}:00-${Number(order.startTime) + 1}:00`}
          </div>
        </div>
        <div className="card-delete">
          <button onClick={deleteOrder} className="delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#212D52">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  )
}

export default UserScheduleCard;
