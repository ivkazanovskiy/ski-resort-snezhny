import React, { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import axios from 'axios';

function TrainersListbox({ sport }) {

  const headers = (sport === 'snowboard') ? { 'sport': 'snowboard' } : { 'sport': 'ski' };

  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState({});

  useEffect(() => {
    axios({
      url: '/api/trainers',
      method: 'GET',
      headers,
    })
      .then(res => {
        setTrainers(res.data.trainers);
      })
      .catch(err => console.log(err.message));
  }, [sport]);

  return (
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
  );
}

export default TrainersListbox;