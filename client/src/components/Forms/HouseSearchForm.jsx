import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import axios from 'axios';

import RoomCard from '../Cards/RoomCard';

function HouseSearchForm(props) {

  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    axios({
      url: '/api/types',
      method: 'GET',
    })
      .then(res => {
        setAllTypes(res.data.types);
      })
      .catch(err => console.log(err.message));
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  console.log('ALL TYPES', allTypes);

  return (
    <div className="w-full px-4 pt-8">
      <div className="w-full max-w-md py-4">

        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              } >
              Номера</Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Коттеджи</Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              } >Гостиницы</Tab>
          </Tab.List>
          <Tab.Panels className="mt-2 rounded-md">
            <Tab.Panel className={classNames(
              'bg-white rounded-md',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}>
              {
                allTypes
                  .filter(el => el.form === 'room')
                  .map(el => <RoomCard key={`${el.id}-room`} type={el}></RoomCard>)
              }
            </Tab.Panel>
            <Tab.Panel className={classNames(
              'bg-white rounded-md',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}>
              {
                allTypes
                  .filter(el => el.form === 'cottage')
                  .map(el => <RoomCard key={`${el.id}-cottage`} type={el}></RoomCard>)
              }
            </Tab.Panel>
            <Tab.Panel className={classNames(
              'bg-white rounded-md',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
            )}>
              {
                allTypes
                  .filter(el => el.form === 'hotel')
                  .map(el => <RoomCard key={`${el.id}-hotel`} type={el}></RoomCard>)
              }
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default HouseSearchForm;