import React from 'react';
import { Tab } from '@headlessui/react';

function SkiPassButton({ data }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (

    <Tab className={({ selected }) => classNames('slider-tab',
      selected
        ? 'slider-active'
        : 'slider-passive'
    )}
    >
      {data.amount}
    </Tab >
  );
}

export default SkiPassButton;
