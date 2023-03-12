import { assign, createMachine } from "xstate";
import { Beneficiary } from "../../models/beneficiaries/Beneficiary";
import { Payment } from "../../models/beneficiaries/BeneficiaryPayment";
import { getAllBeneficiaries, getAllByCurrency } from "../../models/beneficiaries/getBeneficiaries";
import { Quote } from "../../models/quote/Quote";
import { Trade } from "../../models/trade/Trade";

export const transferMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBDAdrAZmVABALLoDGAFgJaZgB0AMgPboTVQFotwDEEjNtagDdGAazqdseQiQrU6TFmw4YIcBMMal0AF0r8A2gAYAusZOJQAB0axKe-pZAAPRAFoAjAFYPtbwDYATg8AZg8PAA5-AHYAFmjogBoQAE9EDzjaWIAmI39siKMIiMCjbNivAF9K5MlcfGIyKgFFVkx2TjVYXn46TXFaOulGuRbmNo7VdU1tB0xzAw8LJBAbOzmnVwRPWIi-INijIw9sr39d-wjktIRs-yNaCPicwOijL1LY6tqMKQbZZp0AAKlFIohUXG4nTABAAymAADZgUg6cxONb2fSYTbpI6+bKBWIhBLREIhbIeYLXdIxWjZELxe6BMl3EIRELfEBDf5NeS0EFgiFqbgAcQA8gB9ABCAEEAMIAaTRKwxGxWWwysSyL0J+WZYWK1IQRLp0UJ7x871yMSqNS5v3qMl5AgF4Oh3AAcgBRADqEuQACUZQARL3K6y2TGOdWILxGEK0fIfZ5BXKEo0hIzRWiBCInM3E-yXIyBTncp2jOhy8iMWwwqVgGg4UGUdCoSg8cXS+VK0zoyNq0A3XI5oyxWK5kshLwVclXFzpbIUxPTjIM6KhAnZMsO4YAvnV2uweuNsDN0it9twBjjAgNpsttsd7p8AT9CS7nmV2iHut30-npez43iw-4PheT7TJgIizFiCx9iqA5YjiCCvHs47REuHixBkG6BIERozv4tBWvGZrspm047lgjojICtAimAOgEAAigArowOhgNwLEAKpisgXoSgGXohgAmuGqxIdGoAahE2S0F4uTvFmXjErERZGvEDwfPcCR5k8-hnNRfwVvRjHMexnHcV2sqKpJqrITGCDYXs7LRJaZTEoEQRGgUxF5pE2QbhEZwhP4Hj+CZtH7gIFmsRxXGipKdlKks-brE5snpGydLxFElInBEbxeEaZo5l40QRVEBL5rm0V7s6dBSrWbpTMl3b2QhEaZTJC4IHGCmBDOcbRKFbLlFpuaJvSHxeE8Xg+OFDVfvRLViEK3HBmK3oOdJ2LOfSOkRWycbhNhHxlThiZlNhc4zhUETVHamCMF0TjlnR8gZVGB3ZdslKBH4ZzBGEkQxPESSpO4RaKcNM6lN4JzYaWdqfbFCjjMo0LwIhvV-f1ni5SEnzkkjE5jlDNzjiRHxjncgR3Ba44rWZfKuptP2Dv1wVA2EE6kicE7BB4RqRAmC0RRD5Ik7aPw0Y136-seYFno+V64z1v0ocyDwYVhOEJIDGb0rQxJhItpxqVmY6s19AjKye4FAderSq4BkGa1J+M66UOYnDEeSYUE87Ux4DzFRbFxxpVT1o5+bMOzWf73mrEEa7Q8JIii7vq8+XNZf14ehI8-hg4belnEaMRA3klzeD5JbFXbGMMUxCXWQXfVbKcviMuSFRN5hxIZsUtBVQVkSM0WJwt01tDrW1XBdwTPfxFkqlGcUDJEq81feHl7LeHk83TnL9oK6tfIAJLYDoqBsSiyhAugKQALaNjoK8oRFvj0+8kRsJlCiGVIyikNLxlOsVQktpqhAA */
  createMachine(
    {
      id: "Transfer Machine",
      initial: "Loading Trades",
      context: {
        trades: [] as Trade[],
        currentTrade: {} as Trade,
        beneficiaries: [] as Beneficiary[],
        errorMessage: undefined as string | undefined,
        quoteFormData: {} as Quote,
        payments: [] as Payment[]
      },
      tsTypes: {} as import("./transfer.machine.typegen").Typegen0,
      schema: {
        services: {} as
          {
            getTrades: {
              type: string
              data: Trade[]
            }
            loadBeneficiaries: {
              type: string
              data: Beneficiary[]
            },
            bookTrade: {
              type: string
              data: Trade
            }

          },
        events: {} as
          | {
            type: "QUOTE_READY"
            quoteData: Quote;
          } | {
            type: "Trade Select"
            trade: Trade
          } | {
            type: "GO_BACK"
          } | {
            type: "GO_NEXT"
          } | {
            type: "NEW_TRADE"
          } | {
            type: "BOOK_TRADE"
          } | {
            type: "DONE"
            trade: Trade
          } | {
            type: "UPDATE_BENEFICIARY_PAYMENT",
            payment: Payment
          } | {
            type: "DISABLE_BENEFICIARY",
            beneficiaryId: string
          }
      },
      states: {
        "Loading Trades": {
          invoke: {
            // Service name
            src: "getTrades",

            onDone: [
              {
                actions: "assignTradesToContext",
                cond: "Has Trades",
                target: "Pick Trade",
              },
              {
                target: "Get Quote",
              },
            ]
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
            NEW_TRADE: {
              target: "Get Quote"
            }

          }
        },

        "Choose Beneficiaries": {
          on: {
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
            "Select Beneficiaries": {
              on: {
                "UPDATE_BENEFICIARY_PAYMENT": {
                  actions: ["updateBeneficiaryPayment"]
                },
                "DISABLE_BENEFICIARY": {
                  actions: ["deleteBeneficiaryPayment"]
                }
              }
            }
          },
        },

        "Get Quote": {
          on: {
            "QUOTE_READY": {
              actions: "assignQuoteFormInputToContext",
              target: "Book Trade"
            },
            "GO_BACK": [
              {
                target: "Pick Trade",
                cond: "Has Trades in Context"
              }, {
                target: "Loading Trades"
              }
            ]
          },

        },
        "Book Trade": {
          on: {
            GO_BACK: "Get Quote",
            DONE: {
              actions: "assignCurrentTrade",
              target: "Choose Beneficiaries"
            }
          },

        },
        "Instructing Payment": {}
      },
    },
    {
      guards: {
        "Has Trades": (context, event) => {
          console.log(`Condition "Has Trades" on Event: `, event);
          return (event as { data: Trade[] }).data.length > 0
          // return context.trades.length >= 0
        },
        "Has Trades in Context": (context, event) => {
          const res = context.trades.length > 0
          console.log(`Condition "Has Trades in Context" -> `, res)
          return res
        }
      },
      actions: {
        deleteBeneficiaryPayment: assign((ctx, ev)=>{
          
          let newPayments = [...ctx.payments]
          newPayments = newPayments.filter(p=> p.id !== ev.beneficiaryId)
          
          return {
            payments: newPayments
          }
        }),
        updateBeneficiaryPayment: assign((context, event) => {
          const newPayments = [...context.payments]
          const existingPayment = newPayments.find(p => p.id === event.payment.id)
          if (existingPayment) {
            Object.assign(existingPayment, event.payment)
          } else {
            newPayments.push(event.payment)
            context.payments.push(event.payment)
          }
          return {
            payments: newPayments
          }
        }),
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
            quoteFormData: event.quoteData,
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
