import { assign, createMachine } from "xstate";
import { Trade } from "../../models/trade/Trade";

export const transferMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBDAdrAZmVABALLoDGAFgJaZgB0ACpaQNYFroRgDEEA9jbWoA3XszrtseQiQrU6jFmwycEw3qXQAXSvwDaABgC6Bw4lAAHXrErb+ZkAA9EAJgAsARlquAnPoCszt5+AOwAbM76wc4ANCAAnoju7qEAvimxErj4xGRUAgqs7Jw8-HRqYrSZUjmy+UyFymCqmCIatpgmuu6mSCCW1u32TghurrQhkX4AzEmhU9Mx8YneABy0QTNTzuHeU96ufmkZGJLZMnny9Uoc3PiovKi05gA2WjgPALaVJ1nSuXIMK5FJpqNo6DpGEz2fo2cFDRAAWjCtFCrmczhWgWcU2C3gxsQSI1cqXSICqZ3+AgA4mBNAQAIoAV14mjoADFKM9ngQ2Z8uABJTDmRl0gDC5CwMChvRhg16wxWUymtHcUxW3lCwUi4Uii0J7l2KNWPkiPkVozSpMwvE48F65L+tTA0KssLs8sR7mcwVo+n0yRCeJxeJWBMQax83ij2K1oX8xO8RzJP2q5wBBWunBdAzhHoQSO8vv9oUDMZDYYQGqTDpqF1oNLpTJZzplrrloGGc0LqvVmu1ESiFfc+lCKuNvmCZq2rlc1ZTFKd9dpDOZrNoHK5PM+2bdmHhCFCKx9PY1WrCA71LmSXmcfn809W09npJraYEgtgmlQjNI2kwUAIeh0DiD4wEwTQd3bRwXEndZHzRftdQreZCz9ND0PQkljiwX5awBABRVB7lQSDcw7RE-D8IsA1xMsMRHZDiUtFIgA */
  createMachine(
    {
      id: "Transfer Machine",
      initial: "Pick Trade",
      context: {
        trades: [] as Trade[],
        errorMessage: undefined as string | undefined,
        quoteFormData: {} as {
          currencyBuy: string;
          currencySell: string;
          sellAmount: string;
        },
      },
      schema: {
        events: {} as
          | {
              type: string;
              data: Trade[];
            }
          | {
              type: "Input Change";
              value: string;
            },
      },
      states: {
        "Pick Trade": {
          invoke: {
            src: "getTrades", // Service name
            onDone: [
              {
                actions: "assignTradesToContext",
                cond: "Has Trades",
                target: "Get Quote",
              },
              {
                target: "Instructing Payment",
              },
            ],
            onError: [
              {
                target: "Error",
              },
            ],
          },
        },
        "Get Quote": {
          initial: "Fill Form",
          states: {
            "Fill Form": {
              on: {
                "Input Change": {
                  actions: "assignQuoteFormInputToContext",
                },
              },
            },
          },
        },
        "Instructing Payment": {},
        Error: {},
      },
    },
    {
      guards:{
        "Has Trades": (context, event) => {
          console.log(`EVENT `,event);
          return (event as {data: Trade[]}).data.length > 0}
      },
      actions: {
        assignTradesToContext: assign((context, event) => {
          console.log(`assignTradesToContext EVENT data`, event);
          return {
            trades: event.data,
          };
        }),
        assignQuoteFormInputToContext: assign((context, event) => {
          return {
            quoteFormData: {
              currencyBuy: event.value,
            },
          };
        }),
      },
    }
  );
