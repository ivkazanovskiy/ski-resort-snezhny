import axios from 'axios';
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Tab } from '@headlessui/react';

import { addZero } from '../../helpers/addZero';
import AdminOrdersTypeForm from '../Forms/AdminOrdersTypeForm';
import { nextStringDate } from '../../helpers/nextStringDate';
import { toStringDate } from '../../helpers/toStringDate';
import { countGapValue } from '../../helpers/countGapValue';

function AdminOrdersForm(props) {

  const startRef = useRef();
  const finishRef = useRef();

  const [startDate, setStartDate] = useState(toStringDate(new Date()));
  //TODO: сохранить GAP  в locals.storage
  const [gap, setGap] = useState(7);
  const [arrayDate, setArrayDate] = useState([]);

  useEffect(() => {
    const arrayDate = [];

    for (let i = 0; i < gap; i += 1) {
      arrayDate.push(nextStringDate(toStringDate(new Date()), i));
    }

    setArrayDate(arrayDate);
  }, [startDate, gap])

  // TODO: возможно стоит заменить не переменную
  const [finishDate, setFinishDate] = useState(nextStringDate(startDate, gap));

  useLayoutEffect(() => {
    setFinishDate(nextStringDate(startDate, gap))
    finishRef.current.value = nextStringDate(startDate, gap)
  }, [startDate, gap]);

  useEffect(() => {
    axios({
      url: '/api/orders',
      method: 'GET',
    });
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <div className="flex justify-around">
        <label htmlFor="start" className="flex flex-col gap-1">
          <div>Заезд</div>
          <input type="date" id="start" defaultValue={startDate} ref={startRef} min={toStringDate(new Date())} onChange={() => setStartDate(startRef.current.value)} />
        </label>

        <label htmlFor="start" className="flex flex-col gap-1">
          <div>Выезд</div>
          <input type="date" id="finish" defaultValue={finishDate} min={nextStringDate(startDate, 1)} ref={finishRef} onChange={() => setGap(countGapValue(startDate, (finishRef.current.value)))} />
        </label>
      </div>
      <div className="">Выбрано {gap} дней </div>

      <div className="w-full  pt-4">
        <Tab.Group>
          <Tab.Panels className="mt-2 rounded-lg">
            <Tab.Panel className={classNames(
              ' rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}>
              <AdminOrdersTypeForm dates={arrayDate} form={'room'}></AdminOrdersTypeForm>
            </Tab.Panel>
            <Tab.Panel className={classNames(
              'bg-white rounded-md',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}>
              <AdminOrdersTypeForm dates={arrayDate} form={'cottage'}></AdminOrdersTypeForm>
            </Tab.Panel>
            <Tab.Panel className={classNames(
              'bg-white rounded-md',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}>
              <AdminOrdersTypeForm dates={arrayDate} form={'hotel'}></AdminOrdersTypeForm>
            </Tab.Panel>
          </Tab.Panels>
          <Tab.List className="flex gap-2 p-[3px] mb-2 rounded-b-lg backdrop-blur-sm bg-white/30 mt-0">
            <Tab className={({ selected }) =>
              classNames(
                'slider-tab',
                selected
                  ? 'slider-active'
                  : 'slider-passive'
              )
            } >Номера
            </Tab>
            <Tab className={({ selected }) =>
              classNames(
                'slider-tab',
                selected
                  ? 'slider-active'
                  : 'slider-passive'
              )
            }>Коттеджи</Tab>
            <Tab className={({ selected }) =>
              classNames(
                'slider-tab',
                selected
                  ? 'slider-active'
                  : 'slider-passive'
              )
            }>Гостиницы</Tab>
          </Tab.List>
        </Tab.Group>
      </div>
    </>
  );
}

export default AdminOrdersForm;