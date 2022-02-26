import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';

import EditUserProfileCard from '../Cards/EditUserProfileCard';
import UserScheduleCard from '../Cards/UserScheduleCard';
import AddUserScheduleCard from '../Cards/AddUserScheduleCard';
import axios from 'axios';

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

  console.log(orders);

  return (
    <>
      <div className="w-full px-4 pt-8">
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl">
          <Disclosure>

            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Информация</span>
              {/* <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-purple-500`}
                /> */}
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 text-sm text-gray-500">
              <EditUserProfileCard />
            </Disclosure.Panel>

          </Disclosure>
          <Disclosure as="div" className="mt-2">

            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Записи</span>
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
                    <AddUserScheduleCard refresh={refresh} setRefresh={setRefresh}></AddUserScheduleCard>
                    :
                    <></>
                }
              </div>
              <ul className="flex flex-col gap-4">
                {orders ?
                  orders.map(order => <UserScheduleCard refresh={refresh} setRefresh={setRefresh} orders={orders} setOrders={setOrders} key={`${order.date}-${order.startTime}-${order['Trainer.id']}`} order={order}></UserScheduleCard>)
                  :
                  <li>Пока нет записей</li>
                }
              </ul>
            </Disclosure.Panel>

          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 ">
                  <span>Брони</span>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  No.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  )
}

export default UserProfile;
