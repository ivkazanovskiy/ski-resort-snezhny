import React from 'react';

function TrainerCustomerCard({ info }) {
  return (
    <li className="border rounded-lg flex gap-2">
      <div>{`${info.startTime}:00`}</div>
      <div>{info.sport}</div>
      <div>{info['User.name']}</div>
      <div>{info['User.surname']}</div>
    </li>
  );
}

export default TrainerCustomerCard;
