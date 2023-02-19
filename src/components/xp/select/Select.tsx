import React, { useState } from 'react'
import Option from './Option'



type SelectProps = React.PropsWithChildren<{ title: string }>
const Select: React.FC<SelectProps> = (props) => {

  const [selectedIdx, setSelectedIdx] = useState(0)

  return (
    <div>
      <h1>{props.title}</h1>
      <div>Selected {selectedIdx} </div>
      <Option
        goNext={() => console.log(`Go Next`)}
        goPrev={() => console.log(`Go Prev`)}></Option>
      {props.children}
    </div>
  )
}


export default Select;