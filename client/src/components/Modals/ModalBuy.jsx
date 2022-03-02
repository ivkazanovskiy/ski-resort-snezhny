import React from 'react';

function ModalBuy({ setModal, mutation, cost }) {
  return (

    <div className="fixed top-0 left-0 right-0 bottom-0 z-20 flex justify-center items-center backdrop-blur-sm bg-slate-400/70 ">
      <div className=" p-2 bg-white w-80 flex flex-col gap-2 rounded-lg">
        <div className=" border rounded-[15px] flex flex-col p-4 gap-4">
          <div className="bg-slate-100 p-2 text-custom-navy rounded-lg">
            **** **** **** ****
          </div>
          <div className="flex gap-2">
            <div className="bg-slate-100 p-2 text-custom-navy rounded-lg grow"> **/**</div>
            <div className="bg-slate-100 p-2 text-custom-navy rounded-lg grow">***</div>
          </div>
        </div>
        <div className="flex  gap-2">
          <button onClick={() => setModal(false)} className="p-2 text-white  bg-custom-sand font-medium text-lg grow rounded-lg">Закрыть</button>
          <button onClick={() => mutation.mutate()} className="p-2 text-white bg-custom-blue font-medium text-lg grow rounded-lg">Оплатить {cost}₽</button>
        </div>
      </div>
    </div>

  );
}

export default ModalBuy;
