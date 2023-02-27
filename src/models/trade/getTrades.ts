import { Trade } from "./Trade";

const trades: Trade[] = [
  {
    id:1,
    date: "2022-05-04",
    amountBuy: 1.55,
    amountSell: 2.55,
    currencyBuy: "GBP",
    currencySell: "EUR",
  },
  {
    id:2,
    date: "2023-01-04",
    amountBuy: 1.55,
    amountSell: 3.12,
    currencyBuy: "USD",
    currencySell: "BGN",
  },
  {
    id:3,
    date: "2023-01-04",
    amountBuy: 1.55,
    amountSell: 3.12,
    currencyBuy: "USD",
    currencySell: "BGN",
  },
];


type GetTradeOptions = {
  delayMs?: number,
  error?: string
  numberOfTrades?: number
}
export const getTrades = async (options?: GetTradeOptions) => {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      // if(options?.error) return reject(options.error)
      if(typeof options.numberOfTrades !== 'undefined'){
        return resolve(trades.slice(0,options?.numberOfTrades))
      } else {
        resolve(trades)
      }
    }, options?.delayMs ?? 1000 )
  })
}