import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';

import EditTrainerProfileCard from '../Cards/EditTrainerProfileCard';
import UserScheduleCard from '../Cards/UserScheduleCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TrainerTimetable from '../Cards/TrainerTimetable';


function TrainerProfile(props) {

  return (
    <div className="w-full px-4 pt-8 flex flex-col gap-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl">
        <Disclosure>
          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>Информация</span>
          </Disclosure.Button>
          <Disclosure.Panel className="pt-4 text-sm text-gray-500">
            <EditTrainerProfileCard></EditTrainerProfileCard>
          </Disclosure.Panel>
        </Disclosure>
      </div>

      <div className="w-full max-w-md mx-auto bg-white rounded-2xl">
        <Disclosure>
          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span>Расписание</span>
          </Disclosure.Button>
          <Disclosure.Panel className="pt-4 text-sm text-gray-500">
            <TrainerTimetable />
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </div>
  );
}

export default TrainerProfile;
