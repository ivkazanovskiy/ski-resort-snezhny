import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Tab } from '@headlessui/react';
import UserScheduleCard from '../Cards/UserScheduleCard';
import axios from 'axios';
import AllOrdersCards from '../Cards/AllOrdersCards';
import UnauthorizedCard from '../Cards/UnauthorizedCard';

function UserProfile(props) {

  const { role } = useSelector(state => state.userReducer);

  // TODO: флажок для обновления стейта, переделать на useQuery
  const [refresh, setRefresh] = useState(false)
  const [orders, setOrders] = useState([]);

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

  if (!role) return (<UnauthorizedCard />);

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.Panels className="mt-2 rounded-lg">
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
  )
}

export default UserProfile;
