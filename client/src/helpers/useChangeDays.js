import { useState } from "react";

export function useChangeDays(initialState = []) {
  const [days, setDays] = useState(initialState);

  function changeDays(day) {
    if (day === 0) {
      setDays([])
    }
    else {
      (days.includes(day)) ?
        setDays(days.filter(el => el !== day))
        :
        setDays([...days, day])
    }
  }
  return [days, changeDays];
}
