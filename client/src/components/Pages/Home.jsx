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
    <div className="flex gap-2 overflow-x-auto w-fit self-start">
      {array.map((obj) => <HomeLinkCard key={obj.id} obj={obj} />)}
    </div>
  );
}

export default Home;
