import React, { useEffect, useState } from 'react';
import { Disclosure, Tab } from '@headlessui/react';

import EditAdminProfileCard from '../Cards/EditAdminProfileCard';
import AdminOrdersForm from '../Forms/AdminOrdersForm';
import axios from 'axios';
import ChooseEditRoomCard from '../Cards/ChooseEditRoomCard';
import AllOrdersCards from '../Cards/AllOrdersCards';

function AdminProfile(props) {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      {/* <div className="w-full px-4 pt-8">
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl">
          <Disclosure as="div" className="mt-2">
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Календарь бронирований</span>
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 text-sm text-gray-500">
              <AdminOrdersForm></AdminOrdersForm>
            </Disclosure.Panel>
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Бронирования администратора</span>
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 text-sm text-gray-500">
              <AllOrdersCards />
            </Disclosure.Panel>
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Редактирование номеров/коттеджей</span>
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 text-sm text-gray-500">
              <ChooseEditRoomCard />
            </Disclosure.Panel>
          </Disclosure>
        </div>
      </div> */}

      <div className="w-full mb-2">
        <AllOrdersCards />
      </div>
    </>
  )
}

export default AdminProfile;
