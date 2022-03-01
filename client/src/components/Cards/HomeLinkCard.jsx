import React from 'react';
import { Link } from 'react-router-dom';

function HomeLinkCard({ obj }) {
  return (
    <Link to={obj.link} className="w-60 h-96 p-2 gap-2 bg-white backdrop-blur-sm bg-white/80 rounded-[25px] flex flex-col items-center">
      <div className="text-lg mt-2 ">{obj.title}</div>
      <img src={obj.img} alt="" className="self-stretch rounded-[18px] grow object-cover" />
    </Link>
  );
}

export default HomeLinkCard;
