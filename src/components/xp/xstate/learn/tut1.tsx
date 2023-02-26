import React from 'react'
import { transferMachine } from './state-machine'
import { useMachine } from "@xstate/react"


export default function SimpleStateMachine1() {

  const [state, send] = useMachine(transferMachine)
  // console.log(state)
  // console.log(send)
  const onPrev = () => {
    console.log(`Prev`)
  }
  const onNext = () => {
    console.log(`Next`)
  }

  return (
    <div className=' border-4 border-solid border-red-800 p-5 '>
      <h1>SimpleStateMachine1</h1>
      <button onClick={onPrev} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded active:bg-red-300 mx-1'>
        Prev
      </button>
      <button onClick={onNext} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded active:bg-blue-300 mx-1'>
        Next
      </button>
    </div>
  )
}
