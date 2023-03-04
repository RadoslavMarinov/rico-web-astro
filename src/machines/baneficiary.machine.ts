import { actions, assign, createMachine } from "xstate";

type Reason = "" | "Paying debts" | "Paying loose women" | "Buying drugs"

export const beneficiaryMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgFF90AjAG0gGIARASQGUBBAIQBkyBtAAwBdRKAAOAe1i4ALrgn5RIAB6IATADYAzCQEBGNQBYAnMYEB2E8cNaANCACe6gRpIbzAVgEDjWvb-M1cwBfYPs0LDxCUgpqOggSADFcGhoCKHpWMgAVAH0AJTJ2VgB5ADlBESQQSWk5BSVVBABaSxJAvS0tDSCPQwAOTv77JwQ9DQE3bo0e7QFDLwXQ8IwcAmJySlpIJJS0-AysvPYAWRKAVTLsyqVa2XlFaqbmvXNjEkG1Pw8NL1ffDQjRDNH4kNR6fwecz+YxGfr9ZYgCJraIkRi4WBxBhkMpcXg3ap3eqPUBNLRmMFqLzzNQCL7GDT9QGORCdVzebx6eZMwxqT6hMIgfASCBwJTIqLEW5Se4NJ7A3ofAzfX76N7dIEtL56MEQ4wefqGcZ9ayIiXrGJbeLSuoPRoKoJK7U-P7q5mjF42dp6jzGAwCDxafqBM2rSWWrEJZKpdI22UklSIcw6GwuCbmeGBrzu4FdMFM-WdQOM7p6UORC1ojGRuPE+0ILSGcxg3wWWlc-XDFktIvtQ2GQzzDxBcawgXBIA */
  initial: "Disabled",
  tsTypes: {} as import("./baneficiary.machine.typegen").Typegen0,
  context: {
    amount: "",
    enabled: false,
    reason: ""
  },
  schema: {
    context: {} as {
      enabled: boolean
      reason: Reason
      amount: string
    },
    events: {} as {
      type: "ENABLE"
    } | {
      type: "DISABLE"
    } | {
      type: "SET_AMOUNT",
      value: string
    } | {
      type: "SET_REASON",
      value: Reason
    }
  },
  states: {
    "Enabled": {
      initial: "Filling",
      on: {
        DISABLE: {
          target: "Disabled",
          actions: [
            "assignDisabledToContext"
          ]
        }
      },
      states: {
        "Filling": {
          on: {
            "SET_REASON": {
              actions: [
                "assignReasonToContext"
              ]
            },
            "SET_AMOUNT": {
              actions: [
                "assignAmountToContext"

              ]
            }
          }
        }
      }
    },
    "Disabled": {
      on: {
        ENABLE: {
          target: "Enabled",
          actions: [
            "assignEnabledToContext"
          ]
        }
      }
    }
  },
}, {
  actions: {
    assignReasonToContext: assign((ctx, ev) => { return { reason: ev.value } }),
    assignAmountToContext: assign((ctx, ev) => {
      console.log(`assignAmountToContext Event = `, ev);
      return { amount: ev.value }
    }),
    assignEnabledToContext: assign((ctx, ev) => {
      console.log(`assignEnabledToContext EVENT -> `, ev)
      return { enabled: true }
    }),
    assignDisabledToContext: assign((ctx, ev) => {
      console.log(`assignDisabledToContext EVENT -> `, ev)
      return { enabled: false }
    })
  }
})