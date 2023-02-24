import React, { useReducer } from 'react'
import PickTrade from '../select/pick-trade/PickTrade'
import BookTrade from './book-trade/BookTrade'
import GetQuote from './get-quote/GetQuote'
import InstructPayment from './instruct-payment/InstructPayment'

export type StepComp = React.FunctionComponent<{
  done: (data: unknown) => void,
  back: (data: unknown) => void,
  name: string
}>

type State = {
  name: "PICK_TRADE" | "GET_QUOTE" | "BOOK_TRADE" | "INSTRUCT_PAYMENT"
}

// -- Action Types
type ActionNext = {
  type: "Next"
}
type ActionBack = {
  type: "Back"
}
type ActionGoto = {
  type: "GoTo"
  state: State["name"]
}

type Action = ActionNext | ActionBack | ActionGoto

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "Back": {
      switch (state.name) {
        case "GET_QUOTE": {
          return {
            ...state,
            name: "PICK_TRADE"
          }
        }
        case "BOOK_TRADE": {
          return {
            ...state,
            name: "GET_QUOTE"
          }
        }
        case "INSTRUCT_PAYMENT": {
          return {
            ...state,
            name: "BOOK_TRADE"
          }
        }
        default :
          return state
      }
    }

    case "Next": {
      switch (state.name) {
        case "PICK_TRADE": {
          return {
            ...state,
            name: "GET_QUOTE"
          };
        }
        case "GET_QUOTE": {
          return {
            ...state,
            name: "BOOK_TRADE"
          }
        }
        case "BOOK_TRADE": {
          return {
            ...state,
            name: "INSTRUCT_PAYMENT"
          }
        }
        default: 
          return state
      }
    }
    case "GoTo": {
      console.log(`GoTo  clicked`, action)
      return { ...state, name: action.state }
    }
    default:
      throw new Error(`Unhandlerd state`)
  }
}
export default function Wrapper() {

  const [state, dispatch] = useReducer(reducer, { name: "PICK_TRADE" })


  const headingMap: { label: string, state: State["name"] }[] = [
    {
      label: "Pick Trade",
      state: "PICK_TRADE"
    },
    {
      label: "Get Quote",
      state: "GET_QUOTE"
    },
    {
      label: "Book Trade",
      state: "BOOK_TRADE"
    },
    {
      label: "Instruct Payment",
      state: "INSTRUCT_PAYMENT"
    },
  ]

  return (<>
    <div id="step-heading" className='flex flex-row justify-around'>
      {headingMap.map((h, idx) => {
        let currentStyle = ''
        if (h.state == state.name) currentStyle = 'text-2xl'
          return <div key={idx}
            onClick={() => dispatch({ type: "GoTo", state: h.state })}
            className={`${currentStyle} hover:bg-slate-400  cursor-pointer border border-spacing-2 border-black`}>{h.label}</div>
      })}
    </div>
    <div id="step-holder" className='outline outline-1 outline-red-400 flex justify-center'>
      {state.name == "PICK_TRADE" &&
        <PickTrade
          back={() => { }}
          done={() => { dispatch({ type: "Next" }) }}
          name="Pick a trade"
        />}
      {state.name == "GET_QUOTE" &&
        <GetQuote
          back={() => dispatch({ type: "Back" })}
          done={() => dispatch({ type: "Next" })}
          name="Get Quote" />}
      {state.name == "BOOK_TRADE" &&
        <BookTrade
          back={() => dispatch({ type: "Back" })}
          done={() => dispatch({ type: "Next" })}
          name="Book a Trade" />}
      {state.name == "INSTRUCT_PAYMENT" &&
        <InstructPayment
          back={() => dispatch({ type: "Back" })}
          done={() => { }}
          name="Instruct Payment" />}
    </div>
  </>)
}

