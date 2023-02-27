import React from 'react'
import { useMachine } from '@xstate/react'
import { transferMachine } from '../../machines/transfer/transfer.machine'
import { getTrades } from '../../models/trade/getTrades'

interface TransferProps extends React.PropsWithChildren {
}

const Transfer: React.FC = ({ children }: TransferProps) => {
  const [state, send] = useMachine(transferMachine, {
    services: {
      getTrades: async () => getTrades({delayMs:500, numberOfTrades: 8})
    },
  })

  return (
    <div>
      <h1>Transfer</h1>
      <div className='flex flex-col items-center bg-slate-100'>
        <div className=' text-4xl text-red-700'>
          <pre>{JSON.stringify(state.value)}</pre>
        </div>
        <div>
          <pre>{JSON.stringify(state.context,undefined,2)}</pre>
        </div>
      </div>
      <div>
        {state.matches("Get Quote") && 
          <>
          <input onChange={(e)=> send({type: "Input Change", value:e.target.value})} type="text" />
           <button onClick={()=>send("")} className='px-3 bg-slate-500'>Get Quote</button>
          </>
        }
      </div>
      {children}
    </div>
  )
}

export default Transfer