import React from 'react';

function TrainingOrderCard({ order }) {

  const fullDate = new Date(order.start);

  let minutes = fullDate.getMinutes();
  let hours = fullDate.getHours() + 3;
  let date = fullDate.getDate();
  let month = fullDate.getMonth() + 1;
  const year = fullDate.getFullYear();

  const role = 'user'; //!!! trainer ПОМЕНЯТЬ НА STATE

  return (
    <form className="my-2">
      <div className="py-4 border border-gray-300 rounded-lg p-2">
        <div className="flex flex-row">
          <div className="col mb-6">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">Дата</label>
            <input placeholder={`${date}.${month}.${year}`} name="date" type="text" id="date" disable="true" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
          </div>
          <div className="col mb-6">
            <label htmlFor="period" className="block mb-2 text-sm font-medium text-gray-900 ">Время</label>
            <input placeholder={`${hours}:${minutes} - ${hours + Number(order.duration)}:${minutes}`} name="period" type="text" id="period" disable="true" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
          </div>
        </div>
        {role === 'user' ?
          <>
            <div className="mb-6">
              <label htmlFor="trainer" className="block mb-2 text-sm font-medium text-gray-900 ">Инструктор</label>
              <input placeholder={`${order['Trainer.name']} ${order['Trainer.surname']}`} name="trainer" type="text" id="trainer" disable="true" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Номер телефона</label>
              <input placeholder={order['Trainer.phone']} name="phone" type="text" id="phone" disable="true" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
            </div>
          </>
          :
          <>
            <div className="mb-6">
              <label htmlFor="client" className="block mb-2 text-sm font-medium text-gray-900 ">Клиент</label>
              <input placeholder={`${order['User.name']} ${order['User.surname']}`} name="client" type="text" id="client" disable="true" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Номер телефона</label>
              <input placeholder={order['User.phone']} name="phone" type="text" id="phone" disable="true" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
            </div>
          </>
        }
        <div className="mb-6">
          <label htmlFor="sport" className="block mb-2 text-sm font-medium text-gray-900">Вид спорта</label>
          <input placeholder={order.sport} name="sport" type="text" id="sport" disable="true" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
        </div>
        <div className="flex flex-row-reverse">
          <button type="submit" className="h-10 w-10 text-white bg-purple-500 hover:bg-purple-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm sm:w-auto px-5 py-2.5">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg> */}
          </button>
        </div>
      </div>
    </form>
  );
}

export default TrainingOrderCard;