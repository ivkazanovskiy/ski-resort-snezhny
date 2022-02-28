import React from 'react';

import OrderButton from '../Elements/OrderButton';

function Row({ room, dates, isMarked, typeId }) {
  return (
    <li className="flex gap-2">
      {
        dates.map(date => <OrderButton key={`${room.id}-${date}`} id={room.id} typeId={typeId} date={date} isMarked={isMarked(room.id, date)}/>)
      }
    </li>
  );
}

export default Row;