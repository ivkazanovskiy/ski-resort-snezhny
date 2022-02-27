import React from 'react';
import { Tab } from '@headlessui/react';


import AdminTableCard from '../Cards/AdminTableCard';

function AdminOrdersTypeForm({ form }) {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      {
        form === 'hotel' ?
          <AdminTableCard form={form} type={undefined}></AdminTableCard>
          :
          <div className="w-full max-w-md pb-4">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                <Tab className={({ selected }) =>
                  classNames(
                    'w-full p-1 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                } >Стандарт
                </Tab>
                <Tab className={({ selected }) =>
                  classNames(
                    'w-full p-1 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }>Комфорт</Tab>
              </Tab.List>
              <Tab.Panels className="mt-2 border-2 rounded-md">
                <Tab.Panel className={classNames(
                  'bg-white rounded-md',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                )}>
                  <AdminTableCard form={form} type={'standart'}></AdminTableCard>
                </Tab.Panel>
                <Tab.Panel className={classNames(
                  'bg-white rounded-md',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                )}>
                  <AdminTableCard form={form} type={'comfort'}></AdminTableCard>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
      }
    </>
  );
}

export default AdminOrdersTypeForm;