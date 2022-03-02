import React from 'react';

function TrainerCustomerCard({ info }) {
  return (
    <li>
      <div className="card justify-start">
        <div className=" card-avatar flex justify-center items-center">
          <span class="material-icons text-7xl ">
            {
              info.sport === 'Лыжи'
                ? "downhill_skiing"
                : "snowboarding"
            }
          </span>
        </div>
        <div className="card-content grow items-center">
          <div className="card-name">
            {`${info['User.name']} ${info['User.surname']}`}
          </div>
          <div className="card-info">
            {info['User.phone']}
          </div>
          <div className="card-info">
            {`${info.date.split('-')[2]}.${info.date.split('-')[1]} ${info.startTime}:00-${Number(info.startTime) + 1}:00`}
          </div>
        </div>
      </div>
    </li>
  );
}

export default TrainerCustomerCard;
