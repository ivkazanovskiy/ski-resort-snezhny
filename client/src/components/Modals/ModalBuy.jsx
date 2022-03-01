import React from 'react';

function ModalBuy({ setModal, mutation, cost }) {
  return (
    <>
      <div className="absolute mt-10 flex flex-col w-3/4 h-1/2 bg-white border rounded-lg p-2">
        <div className="grow  m-8 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 animate-ping" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-center">К оплате: {cost}</div>
        <div className="flex  gap-2">
          <button onClick={() => setModal(false)} className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Закрыть</button>
          <button onClick={() => mutation.mutate()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Оплатить</button>
        </div>
      </div>
    </>
  );
}

export default ModalBuy;
