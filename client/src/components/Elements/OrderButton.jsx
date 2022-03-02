import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderInfoModal from '../Elements/OrderInfoModal';

function OrderButton({ id, date, isMarked, typeId }) {

  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {isMarked ?
        <button onClick={() => setIsModal(true)} className="w-10 h-10 rounded-lg border bg-custom-blue/80"></button>
        :
        <button className="w-10 h-10 rounded-lg border bg-white/80" onClick={() => navigate(`/search/rooms/${typeId}`)}></button>
      }
      {isModal && <OrderInfoModal date={date} id={id} setIsModal={setIsModal} />}
    </>
  );
}

export default OrderButton;