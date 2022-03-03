import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'


export default function ListboxMonth({ setMonth, months }) {
  const curMonthNumber = new Date().getMonth() + 1;
  const [selected, setSelected] = useState(months.find(month => month.id === curMonthNumber) || months[0])

  useEffect(() => {
    setMonth(selected)
  }, [selected, setMonth])

  return (
    <div className="grow">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative ">

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute bottom-10 backdrop-blur-sm bg-white/70 w-full py-1 mt-1 overflow-auto rounded-lg max-h-60">
              {months.map((month, ind) => (
                <Listbox.Option
                  key={ind}
                  className='p-2' value={month} >
                  <>
                    <span
                      className='block truncate'>
                      {month.name}
                    </span>
                  </>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
          <Listbox.Button className="relative p-2 rounded-lg w-full text-left backdrop-blur-sm bg-white/80">
            <span className="">{selected.name}</span>
          </Listbox.Button>
        </div>
      </Listbox>
    </div >
  )
}
