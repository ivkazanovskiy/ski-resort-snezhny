import React, { useState } from 'react';


function PeriodButton({ getTrainersName, time }) {

  const [isClicked, setIsClicked] = useState(false);

  return (
    <button onClick={() => {
      getTrainersName(time);
      setIsClicked(() => !isClicked);
    }}
      id={time} className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">
      {`${time}:00`}</button>
  );
}

export default PeriodButton;