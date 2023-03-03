import React, { useEffect, useReducer } from "react";
import { getRandomRate } from "../../models/quote/getQuote";
import { Quote } from "../../models/quote/Quote";
import Spinner1 from "../spinners/Spinner1";

type QuoteFormProps = Omit<
  Quote,
  "rate" | "amountSell" | "amountBuy"
> & {
  onDone: (quote: Quote) => void;
};

function withDebounce(cb, dbTime = 1000) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, dbTime);
  };
}

const onBuyAmountChangeDispatcher = withDebounce(
  async (state: State, dispatch: React.Dispatch<Action>) => {
    switch (state._state) {
      case "INPUTTING_BUY_AMOUNT": {
        // -- Calculate sell amount and set
        const randQuote = await getRandomRate();
        const sellAmount = (
          parseFloat(state.buyAmount) / randQuote
        ).toString();
        console.log(
          `Buy = ${state.buyAmount}, calculatedSellAmount = ${sellAmount} with rate =${randQuote}`
        );
        dispatch({
          type: "SELL_AMOUNT_CHANGE",
          value: sellAmount,
          evSource: "quote response",
        });
        return;
      }
    }
  }
);

const onSellAmountChangeDispatcher = withDebounce(
  async (state: State, dispatch: React.Dispatch<Action>) => {
    switch (state._state) {
      case "INPUTTING_SELL_AMOUNT": {
        // -- Get quote calculate Buy amount and update
        const randQuote = await getRandomRate();
        const buyAmount = (
          parseFloat(state.sellAmount) * randQuote
        ).toString();
        console.log(
          `Sell = ${state.sellAmount}, canclulatedBuyAmount = ${buyAmount} with rate =${randQuote}`
        );
        dispatch({
          type: "BUY_AMOUNT_CHANGE",
          value: buyAmount,
          evSource: "quote response",
        });
        return;
      }
    }
  }
);

type State = {
  _state:
    | "INPUTTING_SELL_AMOUNT"
    | "SELL_AMOUNT_CALCULATED"
    | "INPUTTING_BUY_AMOUNT"
    | "BUY_AMOUNT_CALCULATED"
    | "UPDATING_RATE"
    | "IDLE";
  currencySell: string;
  currencyBuy: string;
  buyAmount: string;
  sellAmount: string;
  interval?: any;
};

type Action =
  | {
      type: "SUBMIT";
      cb: QuoteFormProps["onDone"];
    }
  | {
      type: "SELL_AMOUNT_CHANGE";
      evSource: "input field" | "quote response";
      value: string;
    }
  | {
      type: "SELL_AMOUNT_CALCULATED";
      value: string;
    }
  | {
      type: "BUY_AMOUNT_CHANGE";
      evSource: "input field" | "quote response";
      value: string;
    }
    | {
      type: "BUY_AMOUNT_CALCULATED";
      value: string;
    }
  | {
      type: "GOTO";
      state: State["_state"];
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    // --------------
    case "SUBMIT": {
      console.log(`SUBMIT QUOTE FORM -> `, state);
      const amountBuy = parseFloat(state.buyAmount);
      const amountSell = parseFloat(state.sellAmount);
      action.cb({
        currencySell: state.currencySell,
        amountSell,
        currencyBuy: state.currencyBuy,
        amountBuy,
        rate: amountSell / amountBuy,
      });
      return state;
    }
    // --------------
    case "SELL_AMOUNT_CHANGE": {
      const sellAmount = action.value.replace(/[^0-9\.]/g, "");
      console.log(`SELL_AMOUNT_CHANGE -> `, sellAmount, state._state);
      switch (state._state) {
        case "IDLE":
        case "INPUTTING_BUY_AMOUNT":
        case "INPUTTING_SELL_AMOUNT": {
          return {
            ...state,
            _state:
              action.evSource === "input field"
                ? "INPUTTING_SELL_AMOUNT"
                : state._state,
            sellAmount,
          };
        }
      }
      return state;
    }
    // --------------
    case "BUY_AMOUNT_CHANGE": {
      const buyAmount = action.value.replace(/[^0-9\.]/g, "");
      console.log(`BUY_AMOUNT_CHANGE -> `, buyAmount, state._state);
      switch (state._state) {
        case "INPUTTING_SELL_AMOUNT":
        case "UPDATING_RATE":
        case "INPUTTING_BUY_AMOUNT": {
          return {
            ...state,
            _state:
              action.evSource === "input field"
                ? "INPUTTING_BUY_AMOUNT"
                : state._state,
            buyAmount,
          };
        }
      }
      return state;
    }
    // --------------

    // --------------
    case "GOTO": {
      return {
        ...state,
        _state: action.state,
      };
    }

    default:
      return state;
  }
}

const QuoteForm: React.FC<QuoteFormProps> = ({
  currencyBuy,
  currencySell,
  onDone,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    currencyBuy,
    buyAmount: "",
    currencySell,
    sellAmount: "",
    _state: "IDLE",
  });

  // -- On Input change
  useEffect(() => {
    onSellAmountChangeDispatcher(state, dispatch);
  }, [state.sellAmount]);

  useEffect(() => {
    onBuyAmountChangeDispatcher(state, dispatch);
  }, [state.buyAmount]);

  return (
    <div className="px-3 relative flex flex-col justify-center  border border-gray-200 border-solid border-3">
      <div>
        <pre>{JSON.stringify(state._state)}</pre>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          dispatch({ type: "SUBMIT", cb: onDone });
        }}
        className="flex flex-col justify-center"
      >
        <label className="my-3 flex flex-row justify-center items-center">
          <span className="text-lg text-gray-600 w-[4em]">
            You sell
          </span>
          <input
            value={state.sellAmount}
            onChange={(e) => {
              // dispatch({ type: "GOTO", state: "INPUTTING_SELL_AMOUNT" });
              dispatch({
                type: "SELL_AMOUNT_CHANGE",
                value: e.target.value,
                evSource: "input field",
              });
            }}
            className="w-[22em] p-2.5 mx-2 outline-none text-sm text-gray-900 rounded-md bg-gray-50 border border-gray-300   focus:border-2 focus:border-blue-500"
            type="text"
            placeholder="Sell amount"
          />
        </label>
        <label className="my-3 flex flex-row justify-center items-center relative">
          <span className="text-lg text-gray-600 w-[4em]">
            You buy
          </span>
          <div className="block relative">
            {state._state === "INPUTTING_SELL_AMOUNT" && (
              <div
                id="spinner-buy"
                className="absolute top-1 left-[40%]"
              >
                <Spinner1 />
              </div>
            )}
            <input
              value={state.buyAmount}
              onChange={(e) => {
                // dispatch({ type: "GOTO", state: "INPUTTING" });
                dispatch({
                  type: "BUY_AMOUNT_CHANGE",
                  value: e.target.value,
                  evSource: "input field",
                });
              }}
              className="w-[22em] p-2.5 mx-2 outline-none text-sm text-gray-900 rounded-md bg-gray-50 border border-gray-300   focus:border-2 focus:border-blue-500"
              type="text"
              placeholder="Buy amount"
            ></input>
          </div>
        </label>

        <input
          className="self-center m-2 cursor-pointer active:bg-red-500 hover:bg-green-500 
          w-[10em] px-6 py-2
           text-white bg-green-600
           hover:shadow-riko"
          type="submit"
          value={"Get Quote"}
        />
      </form>
    </div>
  );
};

export default QuoteForm;
