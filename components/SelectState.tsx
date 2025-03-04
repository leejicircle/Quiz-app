import React from 'react'
import { IState } from '@/utils/types'

interface Props {
  states: IState[]
  state: (stateValue: number) => void
}

const SelectState = ({ states, state }: Props) => {
  return (
    <select
      className={
        `mt-1 block w-full rounded-md border border-gray-300
      bg-white py-2 px-3 shadow-sm focus:border-indigo-500
        focus:outline-none focus:ring-indigo-500 sm:text-sm`
      }
      onChange={(e) => state(Number(e.target.value))}

    >
      {states.map((state) => (
        <option
          key={state.id}
          value={state.id - 1}
        >
          {state.title}
        </option>
      ))}
    </select>
  )
}

export default SelectState