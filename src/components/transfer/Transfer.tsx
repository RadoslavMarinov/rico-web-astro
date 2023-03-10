import React from "react";
import { useMachine } from "@xstate/react";
import { transferMachine } from "../../machines/transfer/transfer.machine";
import { getTrades } from "../../models/trade/getTrades";
import {
  getAllBeneficiaries,
  getAllByCurrency,
} from "../../models/beneficiaries/getBeneficiaries";
import QuoteForm from "../quote/QuoteForm";
import BookTrade from "../Trade/BookTrade";
import { Trade } from "../../models/trade/Trade";
import Beneficiary from "../beneficiary/Beneficiary";

interface TransferProps extends React.PropsWithChildren {}

const Transfer: React.FC = ({ children }: TransferProps) => {
  const [state, send] = useMachine(transferMachine, {
    services: {
      getTrades: async (context, event) => {
        const trades = await getTrades({
          delayMs: 300,
          numberOfTrades: 8,
        });
        console.log("Service getTrades done ", event);
        return trades;
      },
      loadBeneficiaries: (context, event) =>
        getAllByCurrency(context.currentTrade.currencyBuy, {
          latencyMS: 300,
        }),
    },
    actions: {},
  });

  return (
    <div>
      <h1>Transfer</h1>
      <div className="flex flex-col items-center bg-slate-100">
        <div className=" text-4xl text-red-700">
          <pre>{JSON.stringify(state.value)}</pre>
        </div>
      </div>
      <div>
        {state.matches("Get Quote") && (
          <div className="m-4">
            <QuoteForm
              currencyBuy="EUR"
              currencySell="GBP"
              onDone={(quote) => {
                console.log(`Get Quote Trade -> `, quote);
                send({ type: "QUOTE_READY", quoteData: quote });
              }}
              onBack={() => send({ type: "GO_BACK" })}
            />
          </div>
        )}
        {state.matches("Book Trade") && (
          <div id="Book Trade">
            <BookTrade
              quote={state.context.quoteFormData}
              onBack={() => send({ type: "GO_BACK" })}
              onDone={(trade: Trade) => {
                send({ type: "DONE", trade });
              }}
            ></BookTrade>
          </div>
        )}
        {state.matches("Pick Trade") && (
          <div className="flex flex-col items-center">
            <h1>Pick A trade please</h1>
            <div
              id="trades"
              className="[&>*:nth-child(odd)]:bg-red-200
              [&>*:nth-child(even)]:bg-green-200
            w-9/12 "
            >
              {state.context.trades.map((t) => {
                return (
                  <div
                    onClick={() =>
                      send({ type: "Trade Select", trade: t })
                    }
                    key={t.id}
                    className="[&>*]:block [&>*]:px-8 hover:cursor-pointer my-2 flex flex-row justify-between "
                  >
                    <span>{t.id}</span>
                    <span>{t.currencyBuy}</span>
                    <span>{t.amountBuy}</span>
                    <span>{t.currencySell}</span>
                    <span>{t.amountSell}</span>
                    <span>{t.date}</span>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                className="m-2 px-5 py-2 bg-red-400"
                onClick={() => send("GO_BACK")}
              >
                Back
              </button>
              <button
                className="mx-2 px-5 py-2 bg-green-300"
                onClick={() => send("NEW_TRADE")}
              >
                New Trade
              </button>
            </div>
          </div>
        )}
        {state.matches("Choose Beneficiaries") && (
          <div
            id="coose-beneficiaries"
            className="flex flex-col justify-center"
          >
            {state.context.beneficiaries?.map((b) => {
              return (
                <Beneficiary
                  beneficiary={b}
                  key={b.id}
                  onDisable = { (id)=>{
                    send({type: "DISABLE_BENEFICIARY", beneficiaryId: b.id})
                  }}
                  onReady={(beneficiaryPayment) => {
                    send({type:"UPDATE_BENEFICIARY_PAYMENT", payment: beneficiaryPayment})
                  }}
                />
              );
            })}
            <div className="flex flex-col items-center">
              <button
                className="w-[5rem] m-2 px-5 py-2 bg-red-400"
                onClick={() => send("GO_BACK")}
              >
                Back
              </button>
            </div>
          </div>
        )}
        {state.matches("Instructing Payment") && (
          <div id="instruct-payment-cont">
            <h1>
              Selected Trade with ID = {state.context.currentTrade.id}
            </h1>
          </div>
        )}
      </div>
      <div className="w-full h-2 mb-28 mt-8 bg-slate-500"></div>
      <div>
        <pre>{JSON.stringify(state.context.payments, undefined, 2)}</pre>
      </div>
      {children}
    </div>
  );
};

export default Transfer;
