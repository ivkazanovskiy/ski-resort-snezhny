import React, { useState } from 'react';


function PeriodButton({ getTrainersName, time, changeHours }) {

  const [isClicked, setIsClicked] = useState(false);

  const passiveStyle = "bg-white/80  "
  const activeStyle = "bg-custom-blue/70 text-white"

  return (
    <button onClick={() => {
      changeHours(time);
      getTrainersName(time);
      setIsClicked(() => !isClicked);
    }}
      id={time} className={`p-2 rounded-lg ${isClicked ? activeStyle : passiveStyle}`}>
      {`${time}:00`}</button>
  );
}

export default PeriodButton;
