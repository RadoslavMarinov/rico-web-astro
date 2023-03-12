import { Beneficiary } from "./Beneficiary";

export interface Payment extends Beneficiary {
  amount: number
}