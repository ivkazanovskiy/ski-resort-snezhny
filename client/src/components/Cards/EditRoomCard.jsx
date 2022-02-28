import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { deleteUser } from '../../redux/actionCreators/userAC';


function EditRoomCard({ type }) {

  const titleRef = useRef()
  const weekdayCostRef = useRef()
  const weekendCostRef = useRef()
  const descriptionRef = useRef()
  const dispatch = useDispatch()

  const [photos, setPhotos] = useState([]);
  const [image, setImage] = useState([]);

  const queryClient = useQueryClient()

  const infoQuery = useQuery(`room-${type}`, () => axios(`/api/types/${type}`))
  const save = useMutation(() => axios({
    url: `/api/types/edit/${type}`,
    method: 'PUT',
    data: {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      weekdayCost: weekdayCostRef.current.value,
      weekendCost: weekdayCostRef.current.value
    }
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries(`room-${type}`)
    },
    onError: (err) => {
      const { response } = err
      switch (response.status) {
        case 403:
          window.alert('Доступ запрещен!')
          localStorage.removeItem('auth_token')
          dispatch(deleteUser())
          break;
        default:
          console.log(response.data)
          break;
      }
    }
  })

  let info;
  let relativePath;
  if (infoQuery.isSuccess) {
    info = infoQuery.data.data;
    relativePath = `/rooms/${info.images}`;
    console.log(relativePath);
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
  }, [relativePath])

  const uploadImage = useCallback((event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('image', image);
    console.log('DATA', data);

    axios({
      url: `/api/photos/${type}`,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(res => {
        setPhotos(() => [...photos, res.data.image]);
      });
  }, [image]);

  const deleteImage = (image) => {

    axios({
      url: `/api/photos/${type}`,
      method: 'DELETE',
      data: {
        image,
      }
    })
      .then(res => {
        res.data.isDelete ? setPhotos(photos.filter(el => el !== image)) : console.log(res.data.error);
      });
  };

  return (
    <>
      {info ?
        <div className="py-4 border border-gray-300 rounded-lg p-2">
          <div className="mb-2">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Заголовок
              <input name="name" type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" defaultValue={info.title} ref={titleRef} />
            </label>
          </div>
          <div className="mb-2">
            <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 ">Описание
              <textarea name="surname" type="text" id="surname" className="h-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" defaultValue={info.description} ref={descriptionRef} />
            </label>
          </div>
          <div className="flex mb-2 gap-2">
            <label htmlFor="weekdayCost">Стоимость в будни
              <input type="number" id="weekdayCost" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" defaultValue={info.weekdayCost} ref={weekdayCostRef} />
            </label>
            <label htmlFor="weekendCost">Стоимость в выходные
              <input type="number" id="weekendCost" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" defaultValue={info.weekendCost} ref={weekendCostRef} />
            </label>

          </div>
          <div className="flex mb-2 gap-2">
            <label htmlFor="photos">Фотографии
              <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 grid grid-cols-2 gap-2">

                {
                  photos.length ?
                    photos.map(el =>
                      <div key={el} className="flex flex-col">
                        <img className="row m-0 p-0 w-auto rounded-md" src={`${relativePath}/${el}`} />
                        <button onClick={
                          (event) => {
                            event.preventDefault();
                            deleteImage(el);
                          }
                        } className="row m-0 p-0">Удалить</button>
                      </div>
                    )
                    :
                    <></>
                }

              </div>
              <input onChange={(event) => setImage(event.target.files[0])} name="image" type="file" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"></input>
              <button onClick={uploadImage}>Добавить</button>
            </label>
          </div>
          <button onClick={() => save.mutate()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Изменить информацию</button>
        </div>
        :
        "Загрузка..."
      }
    </>
  );
}

export default EditRoomCard;
