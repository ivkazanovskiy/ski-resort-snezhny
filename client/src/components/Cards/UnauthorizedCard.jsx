import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

import Login from '../Login/Login';
import Registration from '../Registration/Registration';

function UnauthorizedCard(props) {

  return (
    <div className="card flex-col mb-2 mt-8">
      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Panel className="flex flex-col">
              <Login />
            </Disclosure.Panel>
            <Disclosure.Button className="flex justify-center w-full px-4 py-2 mb-4 text-base font-medium text-white bg-custom-blue rounded-lg">
              <span>Войти</span>
              <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-white`} />
            </Disclosure.Button>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Panel className="flex flex-col">
              <Registration />
            </Disclosure.Panel>
            <Disclosure.Button className="flex justify-center w-full px-4 py-2 mb-4 text-base font-medium text-white bg-custom-blue rounded-lg">
              <span>Зарегистрироваться</span>
              <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-6 h-6 text-white`} />
            </Disclosure.Button>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default UnauthorizedCard;
