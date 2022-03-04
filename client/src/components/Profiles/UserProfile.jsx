import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Tab } from '@headlessui/react';
import UserScheduleCard from '../Cards/UserScheduleCard';
import axios from 'axios';
import AllOrdersCards from '../Cards/AllOrdersCards';
import UnauthorizedCard from '../Cards/UnauthorizedCard';
import { useQuery } from 'react-query';

function UserProfile(props) {

  const { role } = useSelector(state => state.userReducer);

  const ordersQuery = useQuery('allOrdersQuery', () => axios('/api/userSchedule'))

  let orders
  if (ordersQuery.isSuccess) { orders = ordersQuery.data.data.orders }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  if (!role) return (<UnauthorizedCard />);

  return (
    <>
      <Tab.Group>
        <Tab.Panels className="mt-2 rounded-lg overflow-y-auto self-stretch">
          <Tab.Panel className={classNames(
            '',
          )}>

            {orders &&
              <ul className="flex flex-col gap-2 h-fit  ">
                {orders.length > 0 ?
                  orders.map(order => <UserScheduleCard orders={orders} key={`${order.date}-${order.startTime}-${order['Trainer.id']}`} order={order}></UserScheduleCard>)
                  :
                  <li className="mx-2 p-2 rounded-lg text-lg justify-self-center bg-white/80 text-center">Записи к инструктору отсутствуют</li>

                }
              </ul>
            }
          </Tab.Panel>
          <Tab.Panel className={classNames(
            '',
          )}>
            <AllOrdersCards />
          </Tab.Panel>
        </Tab.Panels>
        <Tab.List className="slider-list mt-2 mx-2 mb-0 self-stretch">
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
    </>
  )
}

export default UserProfile;
