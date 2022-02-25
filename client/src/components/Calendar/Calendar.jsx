import React from 'react';

function Calendar(props) {

  //TODO: сделать свойство disabled у button для занятого и нерабочего времени
  //TODO: менять отображение выбранного времени

  return (
    <form className="w-full px-4 py-4 border-2">
      <div>
        <label for="date">Дата:</label>
        <input type="date" id="date" name="date" value={new Date()} />
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row">
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">09:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">10:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">11:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">12:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">13:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">14:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">15:00</button>
        </div>
        <div className="w-full flex flex-row">
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">16:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">17:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">18:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">19:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">20:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">21:00</button>
          <button className="w-12 my-2 border-solid border-2 border-sky-500 rounded-md">22:00</button>
        </div>
      </div>
    </ form>
  );
}

export default Calendar;