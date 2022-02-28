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
        console.log('ORDERS', res.data.orders);
        console.log('ROOMS', res.data.rooms);
      })
      .catch((error) => console.log(error));
  }, []);

  const isMarked = (id, date) => {
    return !!orders.find(el => el.start === date && el['Room.id'] === id);
  }

  return (
    <ul>
      <div className="flex gap-2">
        {
          dates.map(el => <DateButton date={ el.split('-').reverse()[0] } />)
        }
      </div>
      {
        rooms.map(el => <Row key={el.id} room={el} isMarked={isMarked} dates={dates} typeId={el['Type.id']}/>)
      }
    </ul>
  );
}

export default AdminTableCard;