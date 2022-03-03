import React from 'react';
import { prettyPhone } from '../../helpers/pretty'
import axios from 'axios';

function UserScheduleCard({ order, setOrders, orders }) {

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
        {
          order['Trainer.photo']
            ? <img className="card-avatar" src={`/photos/${order['Trainer.photo']}`}></img>
            : <img className="card-avatar" src="https://brilliant24.ru/files/cat/template_01.png"></img>
        }
        <div className="card-content">
          <div className="card-name">
            {`${order['Trainer.name']} ${order['Trainer.surname']}`}
          </div>
          <div className="card-info">
            {prettyPhone(order['Trainer.phone'])}
          </div>
          <div className="card-info">
            {`${order.date.split('-')[2]}.${order.date.split('-')[1]} ${order.startTime}:00-${Number(order.startTime) + 1}:00`}
          </div>
        </div>
        <div className="card-delete">
          <button onClick={deleteOrder} className="delete-btn">
            <span className="material-icons">
              delete
            </span>
          </button>
        </div>
      </div>
    </li>
  )
}

export default UserScheduleCard;
