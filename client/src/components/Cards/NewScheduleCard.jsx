import React, { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import axios from 'axios';

function NewScheduleCard({ sport }) {

  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState({});

  useEffect(() => {
    axios({
      url: '/api/trainers',
      method: 'GET',
      headers: {
        'sport': sport,
      },
    })
      .then(res => {
        setTrainers(res.data.trainers);
      })
      .catch(err => console.log(err.message));
  }, [sport]);

  return (
    <>
      <div className="w-full px-4 py-4 border-2">
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl">
          <label htmlFor="trainersListbox">Инструкторы</label>
          <Listbox id="trainersListbox" defaultValue={selectedTrainer} onChange={setSelectedTrainer}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="block truncate">{`${selectedTrainer.name || 'Выберите инструктора:'} ${selectedTrainer.surname || ''}`}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {trainers.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                              }`}
                          >
                            {`${person.name} ${person.surname}`}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
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
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Записаться</button>
    </>
  );
}

export default NewScheduleCard;