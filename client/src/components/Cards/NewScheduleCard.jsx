import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import axios from 'axios';

import PeriodButton from '../Elements/PeriodButton';

function NewScheduleCard({ sport }) {

  let day = String(new Date().getDate());
  let month = String(new Date().getMonth() + 1);
  const year = String(new Date().getFullYear());

  if (day.length === 1) day = `0${day}`;
  if (month.length === 1) day = `0${month}`;

  const [allTrainers, setAllTrainers] = useState([]);
  const [currentTrainers, setCurrentTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState({});
  const [date, setDate] = useState(`${year}-${month}-${day}`);

  const inputDate = useRef();

  useEffect(() => {
    axios({
      url: '/api/trainers/',
      method: 'GET',
      headers: {
        'sport': sport,
        'bookingdate': date,
      },
    })
      .then(res => {
        setAllTrainers(res.data.trainers);
      })
      .catch(err => console.log(err.message));
  }, [date, sport]);

  useEffect(() => { getTrainersName() }, [allTrainers])

  const getData = (event) => {
    setDate(inputDate.current.value);
  }

  const getTrainersName = (period) => {
    const uniqueNames = [];
    const uniqueTrainers = [];

    if (!period) {
      allTrainers.forEach(trainer => {
        if (!uniqueNames.includes(`${trainer.name} ${trainer.surname}`)) {
          uniqueNames.push(`${trainer.name} ${trainer.surname}`);
          uniqueTrainers.push({ ...trainer });
        }
      });
      console.log('БЕЗ ПЕРИОДА', uniqueTrainers);
      setCurrentTrainers([...uniqueTrainers]);
    } else {
      allTrainers
        .filter(trainer => trainer['Schedules.startTime'] === period)
        .forEach(trainer => {
          if (!uniqueNames.includes(`${trainer.name} ${trainer.surname}`)) {
            uniqueNames.push(`${trainer.name} ${trainer.surname}`);
            uniqueTrainers.push({ ...trainer });
          }
        });
      console.log('С ПЕРИОДОМ', uniqueTrainers);
      setCurrentTrainers([...uniqueTrainers]);
    }
  };

  const saveSchedule = () => {
    const data = {
      trainerId: selectedTrainer.id,
      date,
      sport,
    };

    console.log(data);

    axios({
      url: '/api/schedule',
      method: 'POST',
      data,
    })
  }

  console.log('ALL TRAINERS', allTrainers);
  console.log('CURRENT TRAINERS', currentTrainers);

  return (
    <>
      <div className="w-full px-4 py-4 border-2">
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl">
          <label htmlFor="trainersListbox">Инструкторы:</label>
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
                  {
                    currentTrainers.length ?
                      currentTrainers.map((person, personIdx) => (
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
                      ))
                      :
                      <Listbox.Option
                        key={null}
                        className={({ active }) =>
                          `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                          }`
                        }
                      >
                        Нет свободных инструкторов
                      </Listbox.Option>
                  }
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div className="w-full px-4 py-4 border-2">
        <label htmlFor="date">Дата:</label>
        <input ref={inputDate} onChange={getData} type="date" id="date" name="date" min={new Date()} defaultValue={date} />

        <div className="w-full flex flex-col">
          <div className="w-full">
            {
              ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22']
                .map(time =><PeriodButton key={time.id} time={time} getTrainersName={getTrainersName}></PeriodButton>)
            }
          </div>
        </div>
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Записаться</button>
    </>
  );
}

export default NewScheduleCard;