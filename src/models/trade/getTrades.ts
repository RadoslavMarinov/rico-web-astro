import { Quote } from "../quote/Quote";
import { Trade } from "./Trade";
import { trades } from "./trades";



type GetTradeOptions = {
  delayMs?: number;
  error?: string;
  numberOfTrades?: number;
};
export const getTrades = async (options?: GetTradeOptions):Promise<Trade[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // if(options?.error) return reject(options.error)
      if (typeof options.numberOfTrades !== "undefined") {
        return resolve(trades.slice(0, options?.numberOfTrades));
      } else {
        resolve(trades);
      }
    }, options?.delayMs ?? 1000);
  });
};

export const getNewTrade = async (quote:Quote) => {
  
}