import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Row from '../Elements/Row';
import DateButton from '../Elements/DateButton';

function AdminTableCard({ dates, form, type }) {

  const [orders, setOrders] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios({
      url: '/api/orders',
      method: 'GET',
      headers: { form, type },
    })
      .then((res) => {
        setOrders(res.data.orders);
        setRooms(res.data.rooms);
      })
      .catch((error) => console.log(error));
  }, []);

  const isMarked = (id, date) => {
    return !!orders.find(el => el.start === date && el['Room.id'] === id);
  }

  return (
    <ul className="backdrop-blur-sm bg-white/30 p-2 rounded-lg flex flex-col items-center gap-2 overflow-auto">
      <div className="flex gap-2 justify-end content-end">
      <button disabled='true' className="p-2 w-10 h-10 text-white font-medium rounded-lg bg-custom-gray/60"></button>
        {
          dates.map(el => <button disabled='true' className="p-2 w-10 h-10 text-white font-medium rounded-lg bg-custom-gray/60">{el.split('-').reverse()[0]}</button>)
        }
      </div>
      {
        rooms.map(el => <Row key={el.id} room={el} isMarked={isMarked} dates={dates} typeId={el['Type.id']} />)
      }
    </ul>
  );
}

export default AdminTableCard;