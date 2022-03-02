import React from 'react';
import { Tab } from '@headlessui/react';


import AdminTableCard from '../Cards/AdminTableCard';

function AdminOrdersTypeForm({ form, dates }) {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>


      <div className="">
        {
          form === 'hotel' ?
            <AdminTableCard dates={dates} form={form} type={undefined}></AdminTableCard>
            :
            <div className="w-full">
              <Tab.Group>
                <Tab.Panels className="mt-2 rounded-lg">
                  <Tab.Panel className={classNames(
                    'rounded-lg w-full overflow-x-auto'
                  )}>
                    <AdminTableCard dates={dates} form={form} type={'standart'}></AdminTableCard>
                  </Tab.Panel>
                  <Tab.Panel className={classNames(
                    'rounded-lg w-full overflow-x-auto'
                  )}>
                    <AdminTableCard dates={dates} form={form} type={'comfort'}></AdminTableCard>
                  </Tab.Panel>
                </Tab.Panels>
                <Tab.List className="flex gap-2 p-[3px] mt-8 rounded-t-lg backdrop-blur-sm bg-white/30 mb-0">
                  <Tab className={({ selected }) =>
                    classNames(
                      'slider-tab',
                      selected
                        ? 'slider-active'
                        : 'slider-passive'
                    )
                  } >Стандарт
                  </Tab>
                  <Tab className={({ selected }) =>
                    classNames(
                      'slider-tab',
                      selected
                        ? 'slider-active'
                        : 'slider-passive'
                    )
                  }>Комфорт</Tab>
                </Tab.List>
              </Tab.Group>
            </div>
        }
      </div>
    </>
  );
}

export default AdminOrdersTypeForm;