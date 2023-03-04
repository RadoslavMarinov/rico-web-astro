import { promisifyWithDelay } from "../beneficiaries/getBeneficiaries";

const quoteRates = [1.22, 1.55, 1.44, 1.15, 0.65, 0.82, 0.77 ]

function getRandomElement(arr:any[]){
  const idx = Math.floor(Math.random() * arr.length )
  return quoteRates[idx]
}

export function getRandomRate(delayMS = 1000){
  return promisifyWithDelay(getRandomElement(quoteRates), delayMS)
}