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

  return (
    <div className="w-full px-4 pt-8">
      <div className="w-full max-w-md py-4">

        <Tab.Group>
          <Tab.List className="slider">
            <Tab
              className={({ selected }) =>
                classNames(
                  'slider-tab',
                  selected
                    ? 'slider-active'
                    : 'slider-passive'
                )
              } >
              Номера</Tab>
            <Tab
              className={({ selected }) =>
              classNames(
                'slider-tab',
                selected
                  ? 'slider-active'
                  : 'slider-passive'
              )
            } >Коттеджи</Tab>
            <Tab
              className={({ selected }) =>
              classNames(
                'slider-tab',
                selected
                  ? 'slider-active'
                  : 'slider-passive'
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
