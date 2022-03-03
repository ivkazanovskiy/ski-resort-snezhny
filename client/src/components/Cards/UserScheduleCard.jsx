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
            <span class="material-icons">
              delete
            </span>
          </button>
        </div>
      </div>
    </li>
  )
}

export default UserScheduleCard;
