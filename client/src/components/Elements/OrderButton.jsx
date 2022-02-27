import React from 'react';

function OrderButton({ id, date, isMarked }) {
  return (
    <button className={`m-2 w-10 h-10 ${isMarked ? 'bg-red-300' : 'bg-green-300'}`}>
    </button>
  );
}

export default OrderButton;