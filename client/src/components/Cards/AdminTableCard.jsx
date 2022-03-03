import React, { useEffect, useRef } from 'react';
import axios from 'axios';

import Row from '../Elements/Row';
import { useQuery } from 'react-query';

function AdminTableCard({ dates, type, grade }) {

  const formArray = ['room', 'cottage', 'hotel']
  const typeArray = ['standart', 'comfort']
  const rooms = useRef()
  const orders = useRef()
  console.log(formArray[type], typeArray[grade]);

  const { isLoading, isSuccess, data } = useQuery(`adminTableQuery-${type}-${grade}`, () => axios({
    url: '/api/orders',
    method: 'GET',
    headers: {
      form: formArray[type],
      type: typeArray[grade]
    },
  }))

  if (isLoading) return (
    <>
      Загрузка
    </>
  );

  rooms.current = data.data.rooms
  orders.current = data.data.orders

  const isMarked = (id, date) => {
    return !!orders.current.find(el => el.start === date && el['Room.id'] === id);
  }

  return (
    <div className="flex flex-col w-full rounded-lg mt-[72px] overflow-auto">
      <div className="w-fit h-fit p-2 bg-white/50 flex flex-col items-stretch gap-2">
        {
          rooms.current.map(el => <Row key={el.id} room={el} isMarked={isMarked} dates={dates} typeId={el['Type.id']} />)
        }
        <li className="flex gap-2">
          <button disabled={true} className="p-2 w-10 h-10 text-white font-medium rounded-lg bg-custom-gray/60"></button>
          {
            dates.map(el => <button disabled={true} key={el} className="p-2 w-10 h-10 text-white font-medium rounded-lg bg-custom-gray/60">{el.split('-').reverse()[0]}</button>)
          }
        </li>
      </div>
    </div>
  );
}

export default AdminTableCard;
