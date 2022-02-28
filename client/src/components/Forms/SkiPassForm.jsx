import { Tab } from '@headlessui/react';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toStringDate } from '../../helpers/toStringDate'

function SkiPassForm(props) {

  const { auth, skiPass } = useSelector(state => state.userReducer)
  const dayRef = useRef()

  const today = toStringDate(new Date())
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      {auth ?
        <>
          {skiPass ?
            <>
              <div className="flex gap-6 mt-6 p-2">
                Выберите день:
                <input type="date" ref={dayRef} defaultValue={today} />
              </div>
              <Tab.Group as="div" >
                <Tab.List className="flex self-stretch p-1 space-x-1 bg-blue-900/20 rounded-xl">
                  <Tab className={({ selected }) =>
                    classNames(
                      'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  } >По количеству проходов
                  </Tab>
                  <Tab className={({ selected }) =>
                    classNames(
                      'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }>По времени</Tab>
                </Tab.List>
                <Tab.Panels className="mt-2 border-2 rounded-md">
                  <Tab.Panel className={classNames(
                    'bg-white rounded-md',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                  )}>
                    <div>1 проход</div>
                    <div>2 проход</div>
                    <div>3 проход</div>
                    <div>4 проход</div>
                  </Tab.Panel>
                  <Tab.Panel className={classNames(
                    'bg-white rounded-md',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                  )}>

                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>



            </>

            :
            <>
              <div className="w-3/4 mt-6">Для пополнения Ski-Pass необходимо купить его в кассе Горнолыжного курорта Снежный и добавить в личном кабинете в разделе "Информация"</div>
              <Link to="/profile" type="submit" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center ">Личный кабинет</Link>
            </>
          }

        </>
        :
        <>
          <div className="w-3/4 mt-6">Для покупки Ski-Pass войдите в свой профиль или зарегистрируйтесь</div>
          <div className="flex p-2 gap-2 w-full">
            <Link to="/login" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm flex-1 px-5 py-2.5 text-center ">Войти</Link>
            <Link to="/registration" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm flex-1 px-5 py-2.5 text-center ">Зарегистрироваться</Link>
          </div>

        </>
      }
    </>
  );
}

export default SkiPassForm;
