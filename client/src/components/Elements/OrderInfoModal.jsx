import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

function OrderInfoModal({ id, date, setIsModal }) {

  const order = useQuery(`${id}/${date}`, () => axios(
    `/api/orders/${id}/${date}`
  ));

  let info;

  if (order.isSuccess) info = order.data.data.order;

  return (
    <>
      {info && <div className="m-4 absolute w-60 border bg-slate-200">
        <div className="flex flex-col">
          <span>Имя: {`${info['User.name']} ${info['User.surname']}`}</span>
          <span>Номер телефона: {info['User.phone']}</span>
          <span>Почта: {info['User.email']}</span>
        </div>
        <button onClick={() => setIsModal(false)}>Закрыть</button>
      </div>}
    </>
  );
}

export default OrderInfoModal;