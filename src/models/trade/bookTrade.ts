import { promisify } from "../../utils/utils"
import { Quote } from "../quote/Quote"
import { Trade } from "./Trade"
import { trades } from "./trades"


export const bookTrade = async (quote:Quote, delayMS=1000) => {
  return promisify<Trade>(trades[2],delayMS)
}