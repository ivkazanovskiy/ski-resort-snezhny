import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'


// TODO: пофиксить количество дней в феврале
const months = [
  { id: 9, name: 'Сентябрь', days: 30 },
  { id: 10, name: 'Октябрь', days: 31 },
  { id: 11, name: 'Ноябрь', days: 30 },
  { id: 12, name: 'Декабрь', days: 31 },
  { id: 1, name: 'Январь', days: 31 },
  { id: 2, name: 'Февраль', days: 28 },
  { id: 3, name: 'Март', days: 31 },
  { id: 4, name: 'Апрель', days: 30 },

]

export default function ListboxMonth({ setMonth }) {
  const [selected, setSelected] = useState(months[0])

  useEffect(() => {
    setMonth(selected)
  }, [selected, setMonth])

  return (
    <div className=" flex-1">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {/* <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              /> */}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {months.map((month, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                    }`
                  }
                  value={month}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {month.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          {/* <CheckIcon className="w-5 h-5" aria-hidden="true" /> */}
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div >
  )
}
