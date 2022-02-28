import React from 'react';
import { Tab } from '@headlessui/react';

function SkiPassButton({ data }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (

    <Tab className={({ selected }) =>
      classNames(
        'flex-1 w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
        selected
          ? 'bg-white shadow'
          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
      )
    }>
      {data.amount}
    </Tab >
  );
}

export default SkiPassButton;
