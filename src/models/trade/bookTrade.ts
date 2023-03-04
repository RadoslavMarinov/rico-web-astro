import { promisify } from "../../utils/utils"
import { Quote } from "../quote/Quote"
import { Trade } from "./Trade"


export const bookTrade = async (quote:Quote, delayMS=1000) => {
  const trade : Trade = {
    id: Math.ceil(Math.random() * 10),
    amountBuy: quote.amountBuy,
    amountSell: quote.amountSell,
    currencyBuy: quote.currencyBuy,
    currencySell: quote.currencySell
  }
  return promisify<Trade>(trade,delayMS)
}