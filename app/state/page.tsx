import State from '@/components/State'
import { getStates } from '@/utils/functions'
import React from 'react'

const StatePage = () => {

  const states = getStates()

  return (
    <div className={'flex flex-col space-y-4 md:space-y-8 p-4 lg:p-8'}>
      <State states={states} ></State>
    </div>
  )
}

export default StatePage
