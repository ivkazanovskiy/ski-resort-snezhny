import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import axios from 'axios';

import PeriodButton from '../Elements/PeriodButton';
import { useChangeHours } from '../../helpers/useChangeHours';

function NewScheduleCard({ sport }) {

  const newDay = String(new Date().getDate());
  const newMonth = String(new Date().getMonth() + 1);
  const year = String(new Date().getFullYear());

  const day = (newDay.length === 1) ? `0${newDay}` : newDay;
  const month = (newMonth.length === 1) ? `0${newMonth}` : newMonth;

  const [allTrainers, setAllTrainers] = useState([]);
  const [currentTrainers, setCurrentTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState({});
  const [date, setDate] = useState(`${year}-${month}-${day}`);
  const [hours, changeHours] = useChangeHours();

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
    changeHours(0);
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
      setCurrentTrainers([...uniqueTrainers]);
    }
  };

  const saveSchedule = () => {
    const data = {
      trainerId: selectedTrainer.id,
      date,
      sport: (sport === 'ski') ? 'Лыжи' : 'Сноуборд',
      hours,
    };

    axios({
      url: '/api/schedule',
      method: 'POST',
      data,
    });
  }

  console.log('ALL TRAINERS', allTrainers);
  console.log('SELECTED TRAINER', selectedTrainer);

  return (
    <>
      <div className="w-full rounded-md px-4 py-4">
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
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}`
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
      <div className="w-full px-4 py-4">
        <label htmlFor="date">Дата:</label>
        <input ref={inputDate} onChange={getData} type="date" id="date" name="date" min={new Date()} defaultValue={date} />

        <div className="w-full flex flex-col">
          <div className="w-full grid grid-cols-4 gap-2 p-2">
            {
              allTrainers
                .filter(el => el.id === selectedTrainer.id && !el['Schedules.userId'])
                .sort((a, b) => +a['Schedules.startTime'] - +b['Schedules.startTime'])
                .map(el => <PeriodButton key={`${el.id}${el['Schedules.startTime']}`} time={el['Schedules.startTime']} changeHours={changeHours} getTrainersName={getTrainersName}></PeriodButton>)
            }
          </div>
        </div>
      </div>
      <button onClick={saveSchedule} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Записаться</button>
    </>
  );
}

export default NewScheduleCard;