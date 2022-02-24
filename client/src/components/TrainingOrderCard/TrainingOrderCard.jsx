import React from 'react';

function TrainingOrderCard({ order }) {
  return (
    <form>
      <div className="py-4 border border-gray-300 rounded-lg p-2">
        <div className="mb-6">
          <label htmlFor="period" className="block mb-2 text-sm font-medium text-gray-900 ">Дата и время</label>
          <input placeholder={order.createdAt} name="period" type="text" id="period" disable="true" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
        </div>
        <div className="mb-6">
          <label htmlFor="trainer" className="block mb-2 text-sm font-medium text-gray-900 ">Инструктор</label>
          <input placeholder={order.trainerId} name="trainer" type="text" id="trainer" disable="true" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
        </div>
        <div className="mb-6">
          <label htmlFor="sport" className="block mb-2 text-sm font-medium text-gray-900">Вид спорта</label>
          <input placeholder="здесь будет вид спорта" name="sport" type="text" id="sport" disable="true" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
        </div>
        <div className="flex flex-row-reverse">
          <button type="submit" className="h-10 w-10 text-white bg-purple-500 hover:bg-purple-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm sm:w-auto px-5 py-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg></button>
        </div>
      </div>
    </form>
  );
}

export default TrainingOrderCard;