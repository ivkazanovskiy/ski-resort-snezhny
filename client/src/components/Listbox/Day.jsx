import React, { memo, useState, useEffect } from 'react';
import { addZero } from '../../helpers/addZero'

function Day({ day, month, year, changeDays, savedHours }) {
  const currentDay = addZero(year, month, day)

  const [wasSelected, setWasSelected] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  useEffect(() => {
    setWasSelected(savedHours.map(hour => hour.date).includes(currentDay))
    setIsClicked(savedHours.map(hour => hour.date).includes(currentDay))
  }, [savedHours])

  const deletedStyle = "p-2 text-center text-sm text-white border border-gray-300 rounded-lg bg-red-500 "
  const passiveStyle = "p-2 text-center text-sm text-gray-500 border border-gray-300 rounded-lg"
  const activeStyle = "p-2 text-center text-sm text-white border border-gray-300 rounded-lg bg-blue-500 "

  return (
    <button onClick={() => {
      setWasSelected(true)
      changeDays(currentDay);
      setIsClicked(!isClicked)
    }
    } className={isClicked ? activeStyle : (wasSelected) ? deletedStyle : passiveStyle} >
      {day}
    </ button >
  );
}

// TODO: пофиксить мемоизацию
export default memo(Day);
