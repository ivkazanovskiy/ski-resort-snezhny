import React from 'react';
import { Disclosure } from '@headlessui/react';

import EditProfileCard from '../EditProfileCard/EditProfileCard';
import TrainingOrderCard from '../TrainingOrderCard/TrainingOrderCard';

function UserProfile(props) {
  return (

    <div className="w-full px-4 pt-8">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
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
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Записи</span>
                {/* <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-purple-500`}
                /> */}
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <TrainingOrderCard></TrainingOrderCard>
              </Disclosure.Panel>
            </>
          )}
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