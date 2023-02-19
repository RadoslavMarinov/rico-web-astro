import React, { useState } from 'react'

type OptionProps = React.PropsWithChildren<{
  goNext: () => void,
  goPrev: () => void
}>

const Option: React.FunctionComponent<OptionProps> = ({ goNext, goPrev, children }) => {

  const [name, setName] = useState("")

  return (
    <div className='border-2 border-solid border-red-300'>
      <input className='m-4 border-2 border-solid border-pink-800'
        type="text"
        name='Name'
        placeholder='Name'
        onChange={(e) => setName(e.target.value)} />
      <button className='active:bg-red-400 mx-1 px-5 bg-slate-200 hover:bg-slate-100 border-2 border-solid border-slate-900'
        onClick={goPrev}>Prev</button>
      <button className='active:bg-red-400 mx-1 px-5 bg-orange-200 hover:bg-orange-100 border-2 border-solid border-orange-900'
        onClick={goNext}>Next</button>
    </div>
  )
}
export default Option;