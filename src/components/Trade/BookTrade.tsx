import React from "react";
import { Quote } from "../../models/quote/Quote";
import { bookTrade } from "../../models/trade/bookTrade";
import { Trade } from "../../models/trade/Trade";
import ButtonDone from "../button/ButtonDone";

type BookTradeProps = {
  quote: Quote;
  onBack();
  onDone(trade: Trade);
};

type State = {
  _state: "Idle" | "Booking Trade" | "Booking Trade Done";
  trade?: Trade;
};

type Action =
  | {
      event: "BOOK_TRADE";
      quote: Quote;
    }
  | {
      event: "TRADE_DONE";
      trade: Trade;
    }

function reducer(state: State, action: Action): State {
  console.log(`BookTrade Event -> `, action)
  switch (action.event) {
    case "BOOK_TRADE": {
      switch (state._state) {
        case "Idle":{
          return {
            ...state,
            _state: "Booking Trade",
          };
        }
      }
      return state
    }
    case "TRADE_DONE": {
      switch (state._state){
        case "Booking Trade":{
          return {
            ...state,
            _state: "Booking Trade Done",
            trade: action.trade
          };
        }
      }
      return state
    }
  }
}

function BookTrade({ onBack, onDone, quote }: BookTradeProps) {
  const [state, dispatch] = React.useReducer(reducer, {
    _state: "Idle",
  });

  React.useEffect(() => {
    (async () => {
      switch (state._state) {
        case "Booking Trade": {
          const trade = await bookTrade(quote,700);
          dispatch({ event: "TRADE_DONE", trade });
          return 
        }
        case "Booking Trade Done":{
          onDone(state.trade)
          return
        }
      }
    })();
  }, [state._state]);

  return (
    <div id="trade-form">
      <h1 className="text-lg">Trade</h1>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
      <ButtonDone
        name="Confirm"
        onClick={() => {
          dispatch({ event: "BOOK_TRADE", quote });
        }}
      />
    </div>
  );
}

export default BookTrade;
