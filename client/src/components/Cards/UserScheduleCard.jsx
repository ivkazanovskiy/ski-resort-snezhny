import React from 'react';
import { prettyPhone } from '../../helpers/pretty'
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

function UserScheduleCard({ order }) {
  const queryClient = useQueryClient()

  const deleteOrder = useMutation(() => {
    axios({
      url: '/api/userSchedule',
      method: 'DELETE',
      data: {
        date: order.date,
        startTime: order.startTime,
        trainerId: order['Trainer.id'],
      },
    })
  }, {

    onSuccess: () => {
      queryClient.invalidateQueries('allOrdersQuery')
    }
  })


  return (
    <li>
      <div className="card">
        <img className="card-avatar" alt="" src={`/photos/${order['Trainer.photo']}`}></img>
        <div className="card-content">
          <div className="card-name">
            {`${order['Trainer.name']} ${order['Trainer.surname']}`}
          </div>
          <div className="card-info">
            {prettyPhone(order['Trainer.phone'])}
          </div>
          <div className="card-info">
            {`${order.date.split('-')[2]}.${order.date.split('-')[1]} ${order.startTime}:00-${Number(order.startTime) + 1}:00`}
          </div>
        </div>
        <div className="card-delete">
          {deleteOrder.isIdle &&
            <button onClick={() => deleteOrder.mutate()} className="delete-btn">
              <span class="material-icons">
                delete
              </span>
            </button>
          }
        </div>
      </div>
    </li>
  )
}

export default UserScheduleCard;
