import React, { useState } from 'react';
import OrderInfoModal from '../Elements/OrderInfoModal';

function OrderButton({ id, date, isMarked }) {

  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <button onClick={() => setIsModal(true)} className={`p-2 w-10 h-10 text-white font-thin rounded-lg border border-gray-200 ${isMarked ? 'bg-red-300' : 'bg-green-300'}`}>
        {id}</button>
      {isModal && <OrderInfoModal date={date} id={id} setIsModal={setIsModal}/>}
    </>
  );
}

export default OrderButton;