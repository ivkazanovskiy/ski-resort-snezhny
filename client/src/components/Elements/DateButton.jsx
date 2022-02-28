import React from 'react';

function DateButton({ date }) {
  return (
    <button disabled className="pb-2 w-10 h-6 text-white text-sm font-thin rounded-lg border border-gray-200 bg-gray-300">
    {date}</button>
  );
}

export default DateButton;