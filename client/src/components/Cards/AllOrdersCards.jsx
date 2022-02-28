import React from 'react';
import { useQuery } from 'react-query'
import axios from 'axios'
import { nextStringDate } from '../../helpers/nextStringDate'
import OrderCard from './OrderCard';

function AllOrdersCards(props) {

  const allCards = useQuery('allCards', () => axios('/api/userOrders'))

  let orderCards;
  if (allCards.isSuccess) {
    // TODO: вынести в отдельный helper
    const separetedOrders = allCards.data.data
    if (separetedOrders.length > 0) {
      orderCards = [[separetedOrders[0]]]
      for (let i = 1; i < separetedOrders.length; i += 1) {
        const order = separetedOrders[i];
        const lastOrderArray = orderCards[orderCards.length - 1]
        const previousOrder = lastOrderArray[lastOrderArray.length - 1]

        if (previousOrder.roomId === order.roomId
          && order.start === nextStringDate(previousOrder.start, 1)) {
          lastOrderArray.push(order)
        } else {
          orderCards.push([order])
        }
      }
    }
  }
  
  return (
    <>
      {orderCards ?
        <ul className="flex flex-col gap-2">
          {orderCards.map(orders => <OrderCard key={orders[0].id} orders={orders} />)}
        </ul>
        : 'Бронирования отсутствуют'}
    </>

  );
}

export default AllOrdersCards;
