import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Row from '../Elements/Row';

function AdminTableCard({ form, type }) {

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
    console.log('ID', id);
    console.log('DATE', date);
    return !!orders.find(el => el.start === date && el['Room.id'] === id);
  }

  return (
    <ul>
      {
        rooms.map(el => <Row key={el.id} room={el} isMarked={isMarked} dates={['2022-02-28', '2022-03-01', '2022-03-02']} />)
      }
    </ul>
  );
}

export default AdminTableCard;