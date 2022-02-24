import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';

import EditProfileCard from '../Cards/EditProfileCard';
import TrainingOrderCard from '../Cards/TrainingOrderCard';
import axios from 'axios';

function UserProfile(props) {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios({
      url: 'api/trainingOrders',
      method: 'GET',
    })
      .then(res => setOrders(res.data.orders))
      .catch(err => console.log(err.message));
  }, []);

  return (
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
            <EditProfileCard></EditProfileCard>
          </Disclosure.Panel>

        </Disclosure>
        <Disclosure as="div" className="mt-2">

          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>Записи</span>
            {/* <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-purple-500`}
                /> */}
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
            <div className="flex flex-row-reverse">
              <button type="submit" className="h-10 w-10 text-white bg-purple-500 hover:bg-purple-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm sm:w-auto px-5 py-2.5">
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg> */}
              </button>
            </div>
            {orders.map(order => <TrainingOrderCard key={order.id} order={order}></TrainingOrderCard>)}
          </Disclosure.Panel>

        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Брони</span>
                {/* <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-purple-500`}
                /> */}
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

export default UserProfile;