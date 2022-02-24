import React from 'react';

function TrainingOrderCard(props) {
  return (
    <form className="py-4 border border-gray-300 rounded-lg p-2">
      <div className="flex flex-row-reverse">
        <button type="submit" className="h-10 w-10 text-white bg-purple-500 hover:bg-purple-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm sm:w-auto px-5 py-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg></button>
      </div>
      <div className="py-4 border border-gray-300 rounded-lg p-2">
        <div className="mb-6">
          <label htmlFor="period" className="block mb-2 text-sm font-medium text-gray-900 ">Дата и время</label>
          <input name="period" type="text" id="period" disable className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
        </div>
        <div className="mb-6">
          <label htmlFor="trainer" className="block mb-2 text-sm font-medium text-gray-900 ">Инструктор</label>
          <input name="trainer" type="text" id="trainer" disable className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
        </div>
        <div className="mb-6">
          <label htmlFor="sport" className="block mb-2 text-sm font-medium text-gray-900">Вид спорта</label>
          <input name="sport" type="text" id="sport" disable className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
        </div>
        <div className="flex flex-row-reverse">
          <button type="submit" className="h-10 w-10 text-white bg-purple-500 hover:bg-purple-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm sm:w-auto px-5 py-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg></button>
        </div>
      </div>
    </form>
  );
}

export default TrainingOrderCard;