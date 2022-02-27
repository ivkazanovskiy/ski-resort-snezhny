import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';

import { addZero } from '../../helpers/addZero';
import AdminOrdersTypeForm from '../Forms/AdminOrdersTypeForm';

function AdminOrdersForm(props) {

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
    <div className="w-full max-w-md pt-4">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          <Tab className={({ selected }) =>
            classNames(
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            )
          } >Номера
          </Tab>
          <Tab className={({ selected }) =>
            classNames(
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            )
          }>Коттеджи</Tab>
          <Tab className={({ selected }) =>
            classNames(
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            )
          }>Гостиницы</Tab>
        </Tab.List>
        <Tab.Panels className="mt-2 border-2 rounded-md">
          <Tab.Panel className={classNames(
            'bg-white rounded-md',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}>
            <AdminOrdersTypeForm form={'room'}></AdminOrdersTypeForm>
          </Tab.Panel>
          <Tab.Panel className={classNames(
            'bg-white rounded-md',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}>
            <AdminOrdersTypeForm form={'cottage'}></AdminOrdersTypeForm>
          </Tab.Panel>
          <Tab.Panel className={classNames(
            'bg-white rounded-md',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}>
            <AdminOrdersTypeForm form={'hotel'}></AdminOrdersTypeForm>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default AdminOrdersForm;