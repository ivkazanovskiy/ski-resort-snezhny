import React from 'react';

import OrderButton from '../Elements/OrderButton';

function Row({ room, dates, isMarked, typeId }) {
  return (
    <li className="flex gap-2">
       <button disabled={true} className="w-10 h-10 p-2 text-white font-medium rounded-lg bg-custom-gray/60">{room.id}</button>
      {
        dates.map(date => <OrderButton key={`${room.id}-${date}`} id={room.id} typeId={typeId} date={date} isMarked={isMarked(room.id, date)}/>)
      }
    </li>
  );
}

export default Row;