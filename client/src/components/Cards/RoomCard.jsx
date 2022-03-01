import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RoomCard({ type }) {

  const relativePath = `/rooms/${type.images}`;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios({
      url: '/api/photos/',
      method: 'GET',
      headers: {
        folder: relativePath,
      },
    })
      .then((res) => {
        setPhotos(res.data.photos);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <li className="rounded-md flex flex-col items-center gap-4 my-4 font-sans">
      <img className="row w-full h-auto rounded-md" alt="/" src={`${relativePath}/${photos[0]}`} />
      <div className="row w-full grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-4 grid">
          <div className="justify-items-center text-center text-xl">{type.title}</div>
        </div>
        <div className="col-start-1 col-end-4 grid text-sm text-gray-500">
          <div className="justify-items-start text-left m-2">{`Вместимость: ${type.guestCount}`}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        <div className="col-end-7 col-span-3 grid text-sm text-gray-500">
          <div className="justify-items-end text-right m-2">{`от ${type.weekdayCost}₽ / ночь`}</div>
        </div>
      </div>
      <Link to={`/search/${type.form}s/${type.id}`} className="w-full">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Подробнее</button>
      </Link>
    </li >
  );
}

export default RoomCard;
