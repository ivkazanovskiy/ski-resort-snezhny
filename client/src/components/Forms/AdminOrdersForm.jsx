import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';

import { addZero } from '../../helpers/addZero';

function AdminOrdersForm(props) {

  const day = String(new Date().getDate());
  const month = String(new Date().getMonth() + 1);
  const year = String(new Date().getFullYear());

  const inputDate = useRef();
  const [date, setDate] = useState(addZero(year, month, day));

  const getData = (event) => {
    setDate(inputDate.current.value);
  }

  useEffect(() => {
    axios({
      url: '/api/orders',
      method: 'GET',
    });
  }, []);


  return (
    <>
      <div>
        <label htmlFor="date">Дата:</label>
        <input ref={inputDate} onChange={getData} type="date" id="date" name="date" min={new Date()} defaultValue={date} />
      </div>
      <div className="grid grid-cols-7 gap-2 p-2">

      </div>
    </>
  );
}

export default AdminOrdersForm;