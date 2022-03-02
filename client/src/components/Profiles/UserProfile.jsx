import React, { useEffect, useState } from 'react';
import { Disclosure, Tab } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid'

import EditUserProfileCard from '../Cards/EditUserProfileCard';
import UserScheduleCard from '../Cards/UserScheduleCard';
import AddUserScheduleCard from '../Cards/AddUserScheduleCard';
import axios from 'axios';
import AllOrdersCards from '../Cards/AllOrdersCards';

function UserProfile(props) {

  // TODO: флажок для обновления стейта, переделать на useQuery
  const [refresh, setRefresh] = useState(false)
  const [orders, setOrders] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    axios({
      url: '/api/userSchedule',
      method: 'GET',
    })
      .then(res => setOrders(res.data.orders))
      .catch(err => console.log(err.message));
  }, [refresh]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="w-full">
      {/* <div className="w-full px-4 pt-8">
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl">
          <Disclosure>

            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Информация</span>
                  <ChevronUpIcon
                    className={`${open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <EditUserProfileCard />
                </Disclosure.Panel>
              </>
            )}

          </Disclosure>
          <Disclosure as="div" className="mt-2">

            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Добавить новую запись</span>
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div className="flex flex-row-reverse">
                <button onClick={(event) => {
                  event.preventDefault();
                  setIsClicked(!isClicked);
                }
                }
                  className="h-10 w-10 text-white bg-purple-500 hover:bg-purple-900 font-medium rounded-full text-sm">
                  New
                </button>
              </div>
              <div>
                {
                  isClicked ?
                    // FIXME: избавиться от дриллинга
                    <AddUserScheduleCard refresh={refresh} setRefresh={setRefresh} />
                    :
                    <></>
                }
              </div>
            </Disclosure.Panel>
          </Disclosure>
        </div>
      </div> */}

      <div className="w-full">
        <div className="w-full max-w-md">
          <Tab.Group>
            <Tab.Panels className="mt-2 rounded-md">
              <Tab.Panel className={classNames(
                '',
              )}>
                <ul className="grid grid-col gap-2">
                  {orders ?
                    orders.map(order => <UserScheduleCard refresh={refresh} setRefresh={setRefresh} orders={orders} setOrders={setOrders} key={`${order.date}-${order.startTime}-${order['Trainer.id']}`} order={order}></UserScheduleCard>)
                    :
                    <li>Пока нет записей</li>
                  }
                </ul>
              </Tab.Panel>
              <Tab.Panel className={classNames(
                '',
              )}>
                <AllOrdersCards />
              </Tab.Panel>
            </Tab.Panels>
            <Tab.List className="slider-list">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'slider-tab',
                    selected
                      ? 'slider-active'
                      : 'slider-passive'
                  )
                } >
                Записи</Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'slider-tab',
                    selected
                      ? 'slider-active'
                      : 'slider-passive'
                  )
                } >Бронирования</Tab>
            </Tab.List>
          </Tab.Group>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
