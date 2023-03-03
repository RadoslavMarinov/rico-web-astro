import { assign, createMachine } from "xstate";
import { Beneficiary } from "../../models/beneficiaries/Beneficiary";
import { getAllBeneficiaries, getAllByCurrency } from "../../models/beneficiaries/getBeneficiaries";
import { Trade } from "../../models/trade/Trade";

export const transferMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBDAdrAZmVABALLoDGAFgJaZgB0AMgPboTVQFotwDEEjNtagDdGAazqdseQiQrU6TFmw4YIcBMMal0AF0r8A2gAYAusZOJQAB0axKe-pZAAPRAFoAjAFYPtbwDYATg8AZg8PAA5-AHYAFmjogBoQAE9EDzjaWIAmI39siKMIiMCjbNivAF9K5MlcfGIyKgFFVkx2TjVYXn46TXFaOulGuRbmNo7VdU1tB0xzAw8LJBAbOzmnVwRPWIi-INijIw9sr39d-wjktIRs-yNaCPicwOijL1LY6tqMKQbZZoKcbKTo8fCoRioWhWAA2uhwkIAtoNfvUZE15Axge0VFxYBpMCJZvp5qZzE41vYSZt0qdaMdjl4wnETt4kqlEEF6R8jPEIiEItFwmFviAhv8MQIAAqUUiiXFqbigggAZTAMLApB05JWlI2Ky2FUCtAS3jN2VO-i80S813SXmytBCu1il2ip2t-itovF6NGdAAwuRGLYwAQAEJgGg4WWUdCoShwLEsCNRsAx0hxhM8PgCfoSVHDAGYoMh2BhyPR2PxxOwZMQVNVzM16aErS6EkLUwU2xUxwGxD82K0XLu7x5DxGBL+O23WIhWhefkC1kZYLvH2FiX+2gAcTAOgIAEUAK6MHR0ABilBhMIIl6R3AAkpgrCfD0GsDAddZe-rQFs0R7EKuSBA6ITukKrqzh8vg5OcRghPkgS5CEITVDUICYIwXROL6IyAj26zUgO2weIExoBMEYSRDE8TsjcbheouYEOh4XqTuO-iblgaIEZirQglM8C6n+JEAe4oR7CEnwhNkZqxJ8DGILEw7vJ8dwofcXheKpPF-H6gK0DKcoKmARF9pgNK3NExphIp0RhOUFHhLOkQLk8ZzsXEckyVUmH4cWAilqGjbptW2Yib+xH9hJCBAf4I5TvJXgTlO0QzhytwPJ8uwRPJ+RWqE3EBVuhklsGoWVuFzaRfWYUZlmtYWf+LiDq6tAxHc5xhNp1puUUWS8ophSBCEulMuhpW8UWkp0Puh6nue5miTFVmkZ43gjoKSn5O6ES6TBiG0FphxIdkKGIXc+l8UF80HseZ4XrQ163veSIteJbXbDE222byGXZPth1Zf4HjDt4F0cRdqFTT8M3bkZL6wDoqAnlqyhSugKSIlGOifbF32TsODldf4cmvKEgSzl6jpnJcNEFIhck3bNO4AKKoBCqAE+tcW+SdRiBBEGSTrpJTgzT0SLjybHlFOqXZKziMVWWFZpo1LZ1mqGpag1EXNatlnWVExr5GEU4i4E85ybOEGJR8IuwSUzz+dUQA */
  createMachine(
    {
      id: "Transfer Machine",
      // initial: "Loading Trades",
      initial: "Get Quote",
      context: {
        trades: [] as Trade[],
        currentTrade: {} as Trade,
        beneficiaries: [] as Beneficiary[],
        errorMessage: undefined as string | undefined,
        quoteFormData: {} as {
          currencyBuy: string;
          currencySell: string;
          sellAmount: string;
        },
      },
      tsTypes: {} as import("./transfer.machine.typegen").Typegen0,
      schema: {
        services: {} as {
          getTrades: {
            type: string
            data: Trade[]
          }
          loadBeneficiaries: {
            type: string
            data: Beneficiary[]
          }
        },
        events: {} as
          | {
            type: "Input Change";
            value: string;
          } | {
            type: "Trade Select",
            trade: Trade
          } | {
            type: "GO_BACK"
          } | {
            type: "GO_NEXT"
          } | {
            type: "NEW_TRADE",
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
              target: "Choose Beneficiaries"
            },
            GO_BACK: {
              target: "Loading Trades"
            },
            NEW_TRADE:{
              target: "Get Quote"
            }

          }
        },
        "Choose Beneficiaries": {
          on:{
            GO_BACK: {
              target: "Pick Trade"
            }
          },
          initial: "Load Beneficiaries",
          states: {
            "Load Beneficiaries": {
              invoke: {
                src: "loadBeneficiaries",
                onDone: {
                  actions: ["assignBeneficiariesToContext"],
                  target: "Select Beneficiaries"
                }
              },
            },
            "Select Beneficiaries": {}
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
      guards: {
        "Has Trades": (context, event) => {
          console.log(`EVENT `, event);
          return (event as { data: Trade[] }).data.length > 0
        }
      },
      actions: {
        assignBeneficiariesToContext: assign((contex, event) => {
          console.log(`assignBeneficiariesToContext -> `, event.data);
          return {
            beneficiaries: event.data
          }
        }),
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
