import React from "react";
import { useMachine } from "@xstate/react";
import { transferMachine } from "../../machines/transfer/transfer.machine";
import { getTrades } from "../../models/trade/getTrades";
import {
  getAllBeneficiaries,
  getAllByCurrency,
} from "../../models/beneficiaries/getBeneficiaries";
import QuoteForm from "../quote/QuoteForm";

interface TransferProps extends React.PropsWithChildren {}

const Transfer: React.FC = ({ children }: TransferProps) => {
  const [state, send] = useMachine(transferMachine, {
    services: {
      getTrades: async () =>{

        const trades = await getTrades({ delayMs: 300, numberOfTrades:8  })
        console.log('Service getTrades done ', trades)
        return trades
      },
      loadBeneficiaries: (context) =>
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
                console.log(`TRRade -> `, quote);
                send({ type: "QUOTE_READY", quoteData: quote });
              }}
              onBack={() => send({ type: "GO_BACK" })}
            />
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
                <div className="mx-4  border-solid border-2 border-red-200">
                  <div className="flex flex-row [&>*]:w-1/4 [&>*]:text-center">
                    <div className="flex flex-col justify-center">
                      {b.id}
                    </div>
                    <div>{b.currency}</div>
                    <div>{b.iban}</div>
                    <input type="checkbox" />
                  </div>
                </div>
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
        <pre>{JSON.stringify(state.context, undefined, 2)}</pre>
      </div>
      {children}
    </div>
  );
};

export default Transfer;
