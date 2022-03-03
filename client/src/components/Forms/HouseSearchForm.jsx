import React, { useEffect, useState } from 'react';
import axios from 'axios';

import RoomCard from '../Cards/RoomCard';

function HouseSearchForm(props) {

  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    axios({
      url: '/api/types',
      method: 'GET',
    })
      .then(res => {
        setAllTypes(res.data.types);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
      <ul className="w-full flex flex-col-reverse gap-2">
        {allTypes.map(el => <RoomCard key={`${el.id}-room`} type={el}></RoomCard>)}
      </ul>
  );
}

export default HouseSearchForm;
