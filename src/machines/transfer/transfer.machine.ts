import { assign, createMachine } from "xstate";
import { Trade } from "../../models/trade/Trade";

export const transferMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBDAdrAZmVABALLoDGAFgJaZgB0AMgPboTVQFotwDEEjNtagDdGAazqdseQiQrU6TFmw4YIcBMMal0AF0r8A2gAYAusZOJQAB0axKe-pZAAPRAFoAjAFYPtbwDYATg8AZg8PAA5-AHYAFmjogBoQAE9EDzjaWIAmI39siKMIiMCjbNivAF9K5MlcfGIyKgFFVkx2TjVYXn46TXFaOulGuRbmNo7VdU1tB0xzAw8LJBAbOzmnVwRPWIi-INijIw9sr39d-wjktIRs-yNaCPicwOijL1LY6tqMKQbZZoKcbKTo8fCoRioWhWAA2uhwkIAtoNfvUZE15Axge0VFxYBpMCJZvp5qZzE41vYSZt0qdaMdjl4wnETt4kqlEEF6R8jPEIiEItFwmFviAhv8MQIAAqUUiiXFqbigggAZTAMLApB05JWlI2Ky2OWitEC-n8IUCIWi-lCJUCXmu6Wi2RNuXNHlKApCZy+NTFqOGAMxAHEwDoCABFACujB0dAAYpQYTCCPGkdwAJKYKxR8MAYXIWBgOustipjgN6TKtCFuXt2St2SFsX8joQPgeOXORhC+UCuRCd2qfswjC6TnF6NGYApZf1oC2nkCgT8Z2CYUiMXi7JubliISyh3tT0Cgs+UVFk5GgKxShxoPgurn1Mr21ttAtvMH3g8sU+O8QWJYm5T47n7e4vC8IDLwDCVp1oGU5QVGcn3WF8F3SZcP1-V4wnKZdhTbD0vEeCobS3QcLSqP0ryDARQ3DaNYxQ0s0IrDDtmCWgCmif98mdCIoLbHIXXAi1yK8bJ7RiGCsDRa8QzDSMYzjWhE2TVMkVnNjMBpbZ924s9eWtJsCig2I2yZA9vCks0Tn7HsQlkv4pxvLNYB0VAoy1ZQpXQFJETATAdG08tdNfESsleGI7kHV5fzbSjaDOS4NwKRzsmc+S6LoABRVAIVQUL5xcRAktKU8Mg8d5dmCCyOQQGJkp5SSTkOaIvDKYdKiAA */
  createMachine(
    {
      id: "Transfer Machine",
      initial: "Loading Trades",
      context: {
        trades: [] as Trade[],
        currentTrade: {} as Trade,
        errorMessage: undefined as string | undefined,
        quoteFormData: {} as {
          currencyBuy: string;
          currencySell: string;
          sellAmount: string;
        },
      },
      tsTypes: {} as import("./transfer.machine.typegen").Typegen0 ,
      schema: {
        services:{} as {
          getTrades: {
            type: string
            data: Trade[]
          } 
        },
        events: {} as
          | {
            type: "Input Change";
            value: string;
          }
          | {
            type: "Trade Select",
            trade: Trade
          }
      },
      states: {
        "Loading Trades": {
          invoke: {
            src: "getTrades", // Service name
            onDone: [
              {
                actions: "assignTradesToContext",
                cond: "Has Trades",
                target: "Pick Trade",
              },
              {
                target: "Get Quote",
              },
            ],
            onError: [
              {
                target: "Error",
              },
            ],
          },
        },
        "Pick Trade": {
          on: {
            "Trade Select": {
              actions: "assignCurrentTrade",
              target: "Instructing Payment"
            }
          }
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
      guards: {
        "Has Trades": (context, event) => {
          console.log(`EVENT `, event);
          return (event as { data: Trade[] }).data.length > 0
        }
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
              ...context.quoteFormData,
              currencyBuy: event.value
            },
          };
        }),
        assignCurrentTrade: assign((context, event) => {
          console.log(`assignCurrentTrade Event = `, event)
          return {
            currentTrade: event.trade
          }
        })
      },
    }
  );
