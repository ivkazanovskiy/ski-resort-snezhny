import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalOrderInfo from '../Modals/ModalOrderInfo';

function OrderButton({ id, date, isMarked, typeId }) {

  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {isMarked ?
        <button onClick={() => setModal(true)} className="w-10 h-10 rounded-lg border bg-custom-blue/80"></button>
        :
        <button className="w-10 h-10 rounded-lg border bg-white/80" onClick={() => navigate(`/search/${typeId}`)}></button>
      }
      {modal && <ModalOrderInfo date={date} id={id} setModal={setModal} />}
    </>
  );
}

export default OrderButton;
