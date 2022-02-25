import React from 'react';
import { useSelector } from 'react-redux';

function TrainingOrderCard({ order }) {

  const day = order.date.slice(8, 10);
  const month = order.date.slice(5, 7);
  const year = order.date.slice(0, 4);

  const { role } = useSelector(state => state.userReducer);

  return (
    <form className="my-2">
      <div className="py-4 border border-gray-300 rounded-lg p-2">
        <div className="flex flex-row">
          <div className="col mb-6">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">Дата</label>
            <span>{`${day}.${month}.${year}`}</span>
          </div>
          <div className="col mb-6">
            <label htmlFor="period" className="block mb-2 text-sm font-medium text-gray-900 ">Время</label>
            <span>{`${order.startTime}:00-${Number(order.startTime) + 1}:00`}</span>
          </div>
        </div>
        {role === 'user' ?
          <>
            <div className="mb-6">
              <label htmlFor="trainer" className="block mb-2 text-sm font-medium text-gray-900 ">Инструктор</label>
              <span>{`${order['Trainer.name']} ${order['Trainer.surname']}`}</span>
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Номер телефона</label>
              <span>{order['Trainer.phone']}</span>
            </div>
          </>
          :
          <>
            <div className="mb-6">
              <label htmlFor="client" className="block mb-2 text-sm font-medium text-gray-900 ">Клиент</label>
              <span>{`${order['User.name']} ${order['User.surname']}`}</span>
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Номер телефона</label>
              <span>{order['User.phone']}</span>
            </div>
          </>
        }
        <div className="mb-6">
          <label htmlFor="sport" className="block mb-2 text-sm font-medium text-gray-900">Вид спорта</label>
          <span>{order.sport}</span>
        </div>
        <div className="flex flex-row-reverse">
          <button type="submit" className="h-10 w-10 text-white bg-purple-500 hover:bg-purple-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm sm:w-auto px-5 py-2.5">Удалить</button>
        </div>
      </div>
    </form>
  );
}

export default TrainingOrderCard;
