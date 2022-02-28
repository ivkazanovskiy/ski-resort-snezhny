import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderInfoModal({ id, date, setIsModal }) {

  const [info, setInfo] = useState({});

  useEffect(() => {
    axios({
      url: `/api/orders/${id}/${date}`,
      method: 'GET',
    })
      .then(res => setInfo(res.data.order))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="m-4 absolute w-60 border bg-slate-200">
      <div className="flex flex-col">
        <span>Имя: {`${info['User.name']} ${info['User.surname']}`}</span>
        <span>Номер телефона: {info['User.phone']}</span>
        <span>Почта: {info['User.email']}</span>
        <span></span>
      </div>
      <button onClick={() => setIsModal(false)}>Закрыть</button>
    </div>
  );
}

export default OrderInfoModal;