import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function UserScheduleCard({ order, setOrders, orders }) {

  const day = order.date.slice(8, 10);
  const month = order.date.slice(5, 7);
  const year = order.date.slice(0, 4);

  const { role } = useSelector(state => state.userReducer);

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
        console.log(orders, order);
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
      <div className="w-16 h-16 border rounded-full"></div>
      <div className="flex flex-col flex-1">
        <div className="flex ">
          <div className="font-bold">{`${order.startTime}:00-${Number(order.startTime) + 1}:00`}</div>
          <div className="text-center grow">{order.sport}</div>
        </div>
        <div>{`${order['Trainer.name']} ${order['Trainer.surname']}`}</div>
        <div>{order['Trainer.phone']}</div>
      </div>
      <button onClick={deleteOrder} className="h-8 w-8 text-white rounded-full bg-purple-500 hover:bg-purple-900 ">Del </button>
    </li >
  )
}

export default UserScheduleCard;
