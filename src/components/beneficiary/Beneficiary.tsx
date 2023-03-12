import { useMachine } from "@xstate/react";
import React from "react";
import {
  beneficiaryMachine,
  Reason,
} from "../../machines/baneficiary.machine";
import { Beneficiary } from "../../models/beneficiaries/Beneficiary";
import { Payment } from "../../models/beneficiaries/BeneficiaryPayment";
import TextInput from "../inputs/TextInput";

export type BeneficiaryProps = {
  beneficiary: Beneficiary;
  onReady:(payment: Payment)=>void
  onDisable:(id:string)=>void
};

const Beneficiary = ({ beneficiary, onReady, onDisable }: BeneficiaryProps) => {
  const [state, send] = useMachine(beneficiaryMachine, {
    context:{
      id: beneficiary.id
    },
    actions: {
      "formReady":((ctx, ev )=>{
        const formReadyData = {
          ...beneficiary,
          amount: parseFloat(ctx.amount),
        }
        onReady(formReadyData)
      }),
      "onDisabled":((ctx, ev)=>{
        onDisable(ctx.id)
      })
    }
  });

  return (
    <div
      key={beneficiary.id}
      className="mx-4  border-solid border-2 border-red-200"
    >
      <div className="relative pt-[4em]">
        <div
          className="absolute top-4 right-4"
          data-testid="bene-toggle"
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              onChange={(e) => {
                console.log(`Toggle `, e.target.checked);
                send({
                  type: e.target.checked ? "ENABLE" : "DISABLE",
                });
              }}
              type="checkbox"
              value=""
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Toggle me
            </span>
          </label>
        </div>
        {state.matches("Enabled") && (
          <div className="flex flex-row justify-around items-center">
            <TextInput
              initValue={state.context.amount}
              onChange={(value) => {
                // console.log(`TEXT INPUT CHANGE = `, value);
                send({ type: "SET_AMOUNT", value: value });
              }}
              classes="h-8 "
            />
            <select
              className="h-8 outline-none border border-1 border-solid border-gray-400 bg-gray-50 rounded-md cursor-pointer hover:shadow-md focus:border-2 focus:border-blue-600"
              name="Reason"
              id="reason"
              value={state.context.reason}
              onChange={(e) => {
                // console.log(`Selcted=> `, e.target.value)
                send({
                  type: "SET_REASON",
                  value: e.target.value as Reason,
                });
              }}
            >
              <option value="Choose Reason" hidden>
                Choose Reason
              </option>
              <option value="Paying debts">Paying debts</option>
              <option value="Paying loose women">
                Paying loose women
              </option>
              <option value="Buying drugs">Buying drugs</option>
            </select>
            <div
              className="flex flex-col basis-2/5  [&>*]:pl-[20%]"
              data-testid="beneficiary-details"
            >
              <div className="flex flex-row justify-start">
                <span className="mx-2">ID:</span>
                <span>{beneficiary.id}</span>
              </div>
              <div>
                <span className="mx-2">Currency: </span>
                <span>{beneficiary.currency}</span>
              </div>
              <div>
                <span className="mx-2">IBAN: </span>
                <span>{beneficiary.iban}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-center m-4 p-2 ">
        <pre>{JSON.stringify(state.value, null, 2)}</pre>
        <pre>{JSON.stringify(state.context, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Beneficiary;
