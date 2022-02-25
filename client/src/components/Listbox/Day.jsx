import React, { memo, useState } from 'react';
import { addZero } from '../../helpers/addZero'

function Day({ day, month, year, changeDays }) {

  const [isClicked, setIsClicked] = useState(false)

  const passiveStyle = "p-2 text-center text-sm text-gray-500 border border-gray-300 rounded-lg"
  const activeStyle = "p-2 text-center text-sm text-white border border-gray-300 rounded-lg bg-blue-500 "



  return (
    <button onClick={() => {
      changeDays(addZero(year, month, day));
      setIsClicked(!isClicked)
    }
    } className={isClicked ? activeStyle : passiveStyle} >
      {day}
    </ button >
  );
}


export default Day;
