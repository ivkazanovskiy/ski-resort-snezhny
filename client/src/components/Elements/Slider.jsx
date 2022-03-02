import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Transition } from '@headlessui/react'

function Slider({ type }) {

  const infoQuery = useQuery(`room-${type}`, () => axios(`/api/types/${type}`));
  const [photos, setPhotos] = useState([]);

  let info;
  let relativePath;
  if (infoQuery.isSuccess) {
    info = infoQuery.data.data;
    relativePath = `/rooms/${info.images}`;
  }

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
  }, [relativePath]);

  return (
    <>
      <div className="flex rounded-lg h-96 w-full overflow-x-auto snap-x snap-mandatory before:shrink-0 before:w-[30vw] after:shrink-0 after:w-[30vw]">
        {
          photos.length ?
            photos.map(el =>
              <img key={el} alt="" className="shrink-0 snap-center h-full  w-full object-cover" src={`${relativePath}/${el}`} />
            )
            :
            <></>
        }
      </div>
    </>
  );
}

export default Slider;
