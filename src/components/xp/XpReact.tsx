import React, { useEffect, useRef, useState } from 'react'

export default function XpReact() {

  const [counterStarted, setCounterStarted] = useState(false)
  const [count, setCount] = useState(0)

  const counterInterval = useRef(null) 

  useEffect(()=>{
    if(counterStarted){
      counterInterval.current = setInterval(() => { 
        setCount(count=> count+1)
       }, 500)
    } else {
      console.log(`Clearing interval`)
      clearInterval(counterInterval.current)
    }
  }, [counterStarted])
  

  return (
    <div id="xp-react-component">
      <h2 className=''>XpReact</h2>
    <h1>Count = {count}</h1>
    <button className='bg-green-200 border-2 box-content hover:border-indigo-800 m-2 px-2 py-1' onClick={()=>setCounterStarted(true)}>Start</button>
    <button className=' bg-red-100 px-2 py-1' onClick={()=>setCounterStarted(false)}>Stop</button>
    </div>
  )
}
