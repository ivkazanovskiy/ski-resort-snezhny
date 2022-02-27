import React, { memo, useState, useEffect } from 'react';


function Day({ date, changeDays, isMarked }) {

  const [isClicked, setIsClicked] = useState(isMarked)
  // useEffect(() => {
  //   setWasSelected(savedHours.map(hour => hour.date).includes(currentDay))
  //   setIsClicked(savedHours.map(hour => hour.date).includes(currentDay))
  // }, [savedHours])

  // const deletedStyle = "p-2 text-center text-sm text-white border border-gray-300 rounded-lg bg-red-500 "
  const passiveStyle = "p-2 text-center text-sm text-gray-500 border border-gray-300 rounded-lg"
  const activeStyle = "p-2 text-center text-sm text-white border border-gray-300 rounded-lg bg-blue-500 "

  return (
    <button onClick={() => {
      changeDays(date)
      setIsClicked(!isClicked)
    }
    } className={isClicked ? activeStyle : passiveStyle} >
      {date.split('-')[2]}
    </ button >
  );
}

// TODO: пофиксить мемоизацию
export default memo(Day);
