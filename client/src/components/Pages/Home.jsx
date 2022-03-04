import React from 'react';
import HomeLinkCard from '../Cards/HomeLinkCard';

function Home(props) {

  const array = [
    {
      id: 1,
      link: '/map',
      title: 'Карта курорта',
      img: '/homepage/1.jpg'
    },
    {
      id: 2,
      link: '/corporate',
      title: 'Корпоративный отдых',
      img: '/homepage/2.jpg'
    },
    {
      id: 3,
      link: '/restaurants',
      title: 'Рестораны',
      img: '/homepage/3.jpg'
    },
  ];

  return (
    <>
      <div className="grow  mx-2 text-white flex justify-center items-center text-7xl">
        <span className="text-center font-black">Снежный образ жизни</span>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="flex gap-2 w-fit mx-2 mb-2 self-start">
          {array.map((obj) => <HomeLinkCard key={obj.id} obj={obj} />)}
        </div>
      </div>
    </>
  );
}

export default Home;
