import React from 'react'
import { useMachine } from '@xstate/react'
import { transferMachine } from '../../machines/transfer/transfer.machine'
import {Trade} from "../../models/trade/Trade"
interface TransferProps extends React.PropsWithChildren {
}

const Transfer: React.FC = ({ children }: TransferProps) => {
  const [state, send] = useMachine(transferMachine, {
    services: {
      getTrades: async () => {
        console.log(`GET TRADES SERVICE`)
        return new Promise((resolve) => { 
          setTimeout(() => {
            resolve([{
              date: "2022-05-04",
              amountBuy:12.55,
              amountSell: 21.55,
              currencyBuy: "GBP",
              currencySell: "EUR"
            },
            {
              date: "2023-01-04",
              amountBuy:1.55,
              amountSell: 3.12,
              currencyBuy: "USD",
              currencySell: "BGN"
            }] as Trade[])
          }, 2000);
         })
      }
    }
  })

  return (
    <div>
      <h1>Transfer</h1>
      <div className='bg-slate-100'>
        Current state = 
        <span className='text-2xl text-red-700'>
          {state.value.toString()}
        </span>
      </div>
      {children}
    </div>
  )
}

export default Transfer