import React, { memo, useState, useEffect } from 'react';


function Day({ date, changeDays, isMarked }) {

  const currentWeekDay = (new Date(date)).toString().split(' ')[0]
  const isWeekEnd = (currentWeekDay === 'Sat' || currentWeekDay === 'Sun')


  const [isClicked, setIsClicked] = useState(isMarked)
  
  const passiveStyle = "bg-white/80  "
  const activeStyle = "bg-custom-blue/70 text-white"

  return (
    <button onClick={() => {
      changeDays(date)
      setIsClicked(!isClicked)
    }
    } className={`p-2 text-center shadow-lg text-sm rounded-lg backdrop-blur-sm ${isClicked ? activeStyle : passiveStyle} ${isWeekEnd && 'border-2 border-red-300'}`}>
      {date.split('-')[2]}
    </ button >
  );
}

// TODO: пофиксить мемоизацию
export default memo(Day);
