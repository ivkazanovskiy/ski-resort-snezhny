import React, { useState } from 'react';


function PeriodButton({ getTrainersName, time, changeHours }) {

  const [isClicked, setIsClicked] = useState(false);

  const passiveStyle = "p-2 shadow-md text-center text-sm text-gray-500 border border-gray-300 rounded-lg"
  const activeStyle = "p-2 shadow-md text-center text-sm text-white border border-gray-300 rounded-lg bg-blue-500 "

  return (
    <button onClick={() => {
      changeHours(time);
      console.log(time);
      getTrainersName(time);
      setIsClicked(() => !isClicked);
    }}
      id={time} className={isClicked ? activeStyle : passiveStyle}>
      {`${time}:00`}</button>
  );
}

export default PeriodButton;