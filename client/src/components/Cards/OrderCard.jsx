import React from 'react';
import { nextStringDate } from '../../helpers/nextStringDate'

function OrderCard({ orders }) {

  const roomId = orders[0].roomId
  const startDateString = orders[0].start
  const finishDateString = nextStringDate(orders[orders.length - 1].start, 1)
  const ids = orders.map(order => order.id)


  const startDate = new Date(startDateString);
  const finishDate = new Date(finishDateString)

  return (
    <li className="flex gap-2 border rounded-lg p-2">
      <div className="w-8 h-8 border rounded-full flex items-center justify-center ">{roomId}</div>
      <div className="flex flex-col gap-2 grow items-center">
        <div>Дата заезда: {startDate.getDate()}/{startDate.getMonth()}</div>
        <div>Дата выезда: {finishDate.getDate()}/{finishDate.getMonth()}</div>
      </div>
      <button className=" w-10 h-10 border rounded-full"> Del</button>
    </li>
  );
}

export default OrderCard;
