import React from 'react';
import { Tab } from '@headlessui/react';
import EditRoomCard from './EditRoomCard';

function ChooseEditRoomCard(props) {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
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
      <Tab.Panels className="mt-2  rounded-md">
        <Tab.Panel className={classNames(
          'bg-white rounded-md',
          'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
        )}>
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
              } >Стандарт
              </Tab>
              <Tab className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Комфорт</Tab>
            </Tab.List>
            <Tab.Panels className="mt-2  rounded-md">
              <Tab.Panel className={classNames(
                'bg-white rounded-md',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}>
                <EditRoomCard type={1} />
              </Tab.Panel>
              <Tab.Panel className={classNames(
                'bg-white rounded-md',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}>
                <EditRoomCard type={2} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Tab.Panel>
        <Tab.Panel className={classNames(
          'bg-white rounded-md',
          'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
        )}>
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
              } >Стандарт
              </Tab>
              <Tab className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }>Люкс</Tab>
            </Tab.List>
            <Tab.Panels className="mt-2  rounded-md">
              <Tab.Panel className={classNames(
                'bg-white rounded-md',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}>
                <EditRoomCard type={3} />
              </Tab.Panel>
              <Tab.Panel className={classNames(
                'bg-white rounded-md',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}>
                <EditRoomCard type={4} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </Tab.Panel>
        <Tab.Panel className={classNames(
          'bg-white rounded-md',
          'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
        )}>
          <EditRoomCard type={5} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default ChooseEditRoomCard;
