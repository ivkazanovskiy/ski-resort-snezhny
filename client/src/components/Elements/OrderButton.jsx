import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderInfoModal from '../Elements/OrderInfoModal';

function OrderButton({ id, date, isMarked, typeId }) {

  const [isModal, setIsModal] = useState(false);

  return (
    <>
      {isMarked ?
        <button onClick={() => setIsModal(true)} className="p-2 w-10 h-10 text-white font-thin rounded-lg border border-gray-200 bg-red-300">{id}</button>
        :
        <button className="p-2 w-10 h-10 text-white font-thin rounded-lg border border-gray-200 bg-green-300">
          <Link to={`/search/rooms/${typeId}`}>{id}</Link></button>
      }
      {isModal && <OrderInfoModal date={date} id={id} setIsModal={setIsModal} />}
    </>
  );
}

export default OrderButton;