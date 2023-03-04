import React, { useEffect, useReducer } from "react";
import { getRandomRate } from "../../models/quote/getQuote";
import { Quote } from "../../models/quote/Quote";
import { withDebounce } from "../../utils/utils";
import Spinner1 from "../spinners/Spinner1";

type QuoteFormProps = Omit<
  Quote,
  "rate" | "amountSell" | "amountBuy"
> & {
  onDone: (quote: Quote) => void;
  onBack: () => void;
};

const onBuyAmountChangeDispatcher = withDebounce(
  async (state: State, dispatch: React.Dispatch<Action>) => {
    if (state._state == "INPUTTING_BUY_AMOUNT") {
      const randQuote = await getRandomRate();
      const sellAmount = (
        parseFloat(state.buyAmount) / randQuote
      ).toString();
      dispatch({
        type: "SELL_AMOUNT_CALCULATED",
        value: sellAmount,
      });
    }
  }
);

const onSellAmountChangeDispatcher = withDebounce(
  async (state: State, dispatch: React.Dispatch<Action>) => {
    if (state._state === "INPUTTING_SELL_AMOUNT") {
      const randQuote = await getRandomRate();
      const buyAmount = (
        parseFloat(state.sellAmount) * randQuote
      ).toString();
      dispatch({
        type: "BUY_AMOUNT_CALCULATED",
        value: buyAmount,
      });
    }
  }
);

type State = {
  _state:
    | "IDLE"
    | "INPUTTING_SELL_AMOUNT"
    | "INPUTTING_BUY_AMOUNT"
    | "QUOTE_READY"
    | "DONE";

  currencySell: string;
  currencyBuy: string;
  buyAmount: string;
  sellAmount: string;
  interval?: any;
};

type Action =
  | {
      type: "SUBMIT";
    }
  | {
      type: "SELL_AMOUNT_CHANGE";
      value: string;
    }
  | {
      type: "SELL_AMOUNT_CALCULATED";
      value: string;
    }
  | {
      type: "BUY_AMOUNT_CHANGE";
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
  console.log(`EVENT -> `, action.type);
  switch (action.type) {
    // --------------
    case "SUBMIT": {
      switch (state._state) {
        case "QUOTE_READY": {
          return { ...state, _state: "DONE" };
        }
        default: {
          console.log("Quote is not ready yet");
        }
      }
      return state;
    }
    // --------------
    case "SELL_AMOUNT_CHANGE": {
      const sellAmount = action.value.replace(/[^0-9\.]/g, "");
      switch (state._state) {
        case "IDLE":
        case "QUOTE_READY":
        case "INPUTTING_BUY_AMOUNT":
        case "INPUTTING_SELL_AMOUNT": {
          return {
            ...state,
            _state: "INPUTTING_SELL_AMOUNT",
            sellAmount,
          };
        }
      }
      return state;
    }
    // --------------
    case "SELL_AMOUNT_CALCULATED": {
      const sellAmount = action.value.replace(/[^0-9\.]/g, "");
      switch (state._state) {
        case "INPUTTING_BUY_AMOUNT": {
          return {
            ...state,
            sellAmount,
            _state: "QUOTE_READY",
          };
        }
      }
      return state;
    }
    // --------------
    case "BUY_AMOUNT_CHANGE": {
      const buyAmount = action.value.replace(/[^0-9\.]/g, "");
      switch (state._state) {
        case "IDLE":
        case "QUOTE_READY":
        case "INPUTTING_SELL_AMOUNT":
        case "INPUTTING_BUY_AMOUNT": {
          return {
            ...state,
            _state: "INPUTTING_BUY_AMOUNT",
            buyAmount,
          };
        }
      }
      return state;
    }
    // --------------
    case "BUY_AMOUNT_CALCULATED": {
      const buyAmount = action.value.replace(/[^0-9\.]/g, "");
      switch (state._state) {
        case "INPUTTING_SELL_AMOUNT": {
          return {
            ...state,
            buyAmount,
            _state: "QUOTE_READY",
          };
        }
      }
      return state;
    }
    // --------------
    case "GOTO": {
      return {
        ...state,
        _state: action.state,
      };
    }
    // --------------
    default:
      return state;
  }
}

const QuoteForm: React.FC<QuoteFormProps> = ({
  currencyBuy,
  currencySell,
  onDone,
  onBack
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

  // --
  useEffect(() => {
    if (state._state === "DONE") {
      const amountBuy = parseFloat(state.buyAmount);
      const amountSell = parseFloat(state.sellAmount);
      onDone({
        currencySell: state.currencySell,
        amountSell,
        currencyBuy: state.currencyBuy,
        amountBuy,
      });
    }
  }, [state._state]);

  return (
    <div className="px-3 relative flex flex-col justify-center  border border-gray-200 border-solid border-3">
      <div>
        <pre>{JSON.stringify(state._state)}</pre>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "SUBMIT" });
        }}
        className="flex flex-col justify-center"
      >
        <label className="my-3 flex flex-row justify-center items-center">
          <span className="text-lg text-gray-600 w-[4em]">
            You sell
          </span>
          <div className="block relative">
            {state._state === "INPUTTING_BUY_AMOUNT" && (
              <div
                id="spinner-buy"
                className="absolute top-1 left-[40%]"
              >
                <Spinner1 />
              </div>
            )}
            <input
              value={state.sellAmount}
              onChange={(e) => {
                dispatch({
                  type: "SELL_AMOUNT_CHANGE",
                  value: e.target.value,
                });
              }}
              className="w-[22em] p-2.5 mx-2 outline-none text-sm text-gray-900 rounded-md bg-gray-50 border border-gray-300   focus:border-2 focus:border-blue-500"
              type="text"
              placeholder="Sell amount"
            />
          </div>
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
                dispatch({
                  type: "BUY_AMOUNT_CHANGE",
                  value: e.target.value,
                });
              }}
              className="w-[22em] p-2.5 mx-2 outline-none text-sm text-gray-900 rounded-md bg-gray-50 border border-gray-300   focus:border-2 focus:border-blue-500"
              type="text"
              placeholder="Buy amount"
            ></input>
          </div>
        </label>

        <div className="flex flex-row items-center justify-center">
          <button
            className="m-2 px-5 py-2 bg-red-400"
            onClick={ onBack}
          >
            Back
          </button>
          <input
            className="self-center m-2 cursor-pointer active:bg-red-500 hover:bg-green-500 
          w-[10em] px-6 py-2
           text-white bg-green-600
           hover:shadow-riko"
            type="submit"
            value={"Continue"}
          />
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;
