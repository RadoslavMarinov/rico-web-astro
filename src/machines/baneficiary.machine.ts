import { actions, assign, createMachine } from "xstate";

export type Reason = "" | "Paying debts" | "Paying loose women" | "Buying drugs"

export const beneficiaryMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgFF90AjAG0gGIARASQGUBBAIQBkyBtAAwBdRKAAOAe1i4ALrgn5RIAB6IAjALUkATAE4ArADYBAgBxqAzABZTAw7oA0IAJ6IAtNsOmSA3Wv0W+voCAOz6YfoAvpFOaFh4hKQU1HQQJADC2GCYANYABABiEgBOqHkASmDoEARwsPSCIkggktJyCkqqCFYBJGqmFtqm4b66g9r6Tq4Iaho6PUZmZp4WuobRsRg4tUmUtJAZWbmFJWWV1bWw9XxqTeJSsvKKzV0LfWo9gf0C2haBU4hrFpZlZDAFbKZjCELBsQHFtolyHtUiQiqUKlUIM56KwyAAVAD65TI7FYAHkAHKNJStR4dF7uNQTEjWAymXRWKwWEL2SEA7r6EjhfTaEJ+ELskISwzrGJwrYJYhIlIHNFnTHY3GE9gAWTJAFUKXjqc1ae1nqAuuySGs1DzfCFNBY1GD+T0hWFReLJdLZZt4jtlfs0gVcDQaAQoCdSjj8USSeSqcIaQ9zZ11KZvIYJSEXV4-NZwvznYKxms9KES6ZYfDFbsVSGwxH8FG1bHtXrDcbk6bU090wg3H4SOYxYZ-KFdNoXSFi-4batDBXof4xTWFYHGLhYA36GQKVxeCb7m1+wzB79tH1DFyNLnuRZ+R4vD4-EFIePTNo9FZonL8BIEBwEotY7Cmp70pa7hDAI163qEljQk+VjaLBzooQIXLOgM2iguuAaIskwbgXSFoqIy0IslYbIclyPK6KYVhPrMV6DOyBhTpYYxSvhCJKkRKKZNk+RqhiFyEFcJFpueN4kMYXKGNY0Jfoh-LTlmYorB8KGoQxvF1kGKKiecWJSWeUEzJhQoypCIyzDyX5PrhI5DAxYoMV4KkwnKoGEciqpNpG0aoGZkHkTM342kEgQMaCtqhPy+izFFXizGofjGJmv4+RuiJbjuxG9hBZFdG4fwsp47Lsl4IRWD8ahPn8V7mBhPwWMYQS6CEf6REAA */
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
    },

  },
  states: {
    "Enabled": {
      initial: "Filling Form",
      on: {
        DISABLE: {
          target: "Disabled",
          actions: [
            "assignDisabledToContext"
          ]
        }
      },
      states: {
        "Check Form Readiness": {
          always: [
            { cond: "formReady", target: "Form Ready" },
            { target: "Filling Form" }
          ]
        },

        "Form Ready": {
          on: {
            "SET_REASON": [
              { actions: ["assignReasonToContext"], target: "Check Form Readiness" }
            ],
            "SET_AMOUNT": [
              { actions: ["assignAmountToContext"], target: "Check Form Readiness" }
            ]
          }
        },

        "Filling Form": {
          on: {
            "SET_REASON": [
              { actions: ["assignReasonToContext"], target: "Check Form Readiness" },
            ],
            "SET_AMOUNT": [
              { actions: ["assignAmountToContext"], target: "Check Form Readiness" },
            ]
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
  guards: {
    formReady: (ctx, ev) => {
      const result: boolean = ctx.amount.length > 0 && ctx.reason !== ""
      console.log(`COND:formReady -> `, result)
      return result
    }
  },
  actions: {
    assignAmountToContext: assign((ctx, ev) => {
      console.log(`ACTION assignAmountToContext -> `, ev)
      return {
        amount: ev.value
      }
    }),
    assignReasonToContext: assign((ctx, ev) => {
      console.log(`ACTION assignReasonToContext -> `, ev)
      return {
        reason: ev.value
      }
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