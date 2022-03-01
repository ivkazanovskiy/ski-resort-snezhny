import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

function Home(props) {

  const { isLoading, isSuccess, data } = useQuery('weatherQuery', () => axios('/data/2.5/weather?lat=60.521970&lon=29.764107&appid=f42b2f779a9734d9aa2d43a8aef21bf8'));

  const weather = useRef();

  if (isSuccess) {
    weather.current = data.data;
    console.log(weather.current)
  };

  if (isLoading) return (
    <>
      Загрузка
    </>
  );

  if (isSuccess) return (
    <>
      <div className="border border-gray-100 w-100 h-100">
        <div>Температура: {`${Math.round(weather.current.main.temp - 273)}°C`}</div>
      </div>
    </>
  );
}

export default Home;
