import { actions, assign, createMachine } from "xstate";

export type Reason = "" | "Paying debts" | "Paying loose women" | "Buying drugs"

export const beneficiaryMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgFF90AjAG0gGIARASQGUBBAIQBkyBtAAwBdRKAAOAe1i4ALrgn5RIAB6IAjADYNJAEwD9AgMyG1ADgDsAVnPmdAGhABPRDp3a1Oy0Z2GAnBp1TN0sAXxCHNCw8QlIKajoIEgAxXBoaAigAAiSJACdUelYyABUAfQAlMnZWAHkAOUERJBBJaTkFJVUEAJ0SQysjABYNQYERwcsHZwQ1X3MSAwEJi0G1YzMwiIwcAmJySlpIZNT0-Cyc-MKS0vYAWRqAVTrixqVW2XlFZq6evoHDYajcaTJwuXyGPpeJamAReQwaSymTYgSI7GL7eJHADC2DAmAA1tk8qhMuUwOgILtYLB6K9mu92l9QD9zKYSGYrINzAiBL4BGYpohEb1RvpLBNzHyNP1kajons4odEji8YSLiSyRSqTS+GomuIpB8Ot9EBoggsoaYtDD9LNBTNLGoFgYzLNLOL+aFwijtvLYgcEsliaTyRBHFcypVqvU6Qa2p9OqbXH84YCxoMJvbDKZfCRzAYvK4Eb5TF6tlFdv7MYl1SGKeGimU7o9nrGWobGYnusn+qmRunM6CEIMrRaxTpRoETGNZb7KyRGLhYNX6GQ6lxeG2GQmTTMtLpFusLNZbFnk1zU9ZPGpLG4wt78BIIHAlHLK28OzvmYgALQae0-hOzr6DoahrIEvhuDos4VuiioJB+8bGt+CD9NoAjHoYAjcqYai2Go9rSiQUL6AiljTtKSLem+cEBkcKRpBkRL5IhRpMioiBcrmcxeGYcyDAC5iGPaoHzJBhZmNmvjuhYMFogqdHKriBLMRqobaqxna7r4OkkKYGawqseiDPaXK9KJ-hCaWljghMcl+hiSpBvkdZhppX4ccOQEYVYWE4XhoGmaYbIXksGj4QCHj2fOi7Lkq7nIZ5gz2EOniWOyxjwjYfizAihj3iEQA */
  initial: "Disabled",
  tsTypes: {} as import("./baneficiary.machine.typegen").Typegen0, 
  context: {
    id:"",
    amount: "",
    enabled: false,
    reason: ""
  },
  schema: {
    context: {} as {
      id:string
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
      initial: "Check Form Readiness",
      on: {
        DISABLE: {
          target: "Disabled",
          actions: [
            "assignDisabledToContext",
            "onDisabled"
          ]
        }
      },
      states: {
        "Filling Form": {
          entry:["onDisabled"],
          on: {
            "SET_REASON": [
              { actions: ["assignReasonToContext"], target: "Check Form Readiness" },
            ],
            "SET_AMOUNT": [
              { actions: ["assignAmountToContext"], target: "Check Form Readiness" },
            ]
          }
        },

        "Check Form Readiness": {
          always: [
            { cond: "formReady", target: "Form Ready" },
            { target: "Filling Form" }
          ]
        },
        
        "Form Ready": {
          entry:"formReady",
          on: {
            "SET_REASON": [
              { actions: ["assignReasonToContext"], target: "Check Form Readiness" }
            ],
            "SET_AMOUNT": [
              { actions: ["assignAmountToContext"], target: "Check Form Readiness" }
            ]
          }
        },

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
      return result
    }
  },
  actions: {
    assignAmountToContext: assign((ctx, ev) => {
      return {
        amount: ev.value
      }
    }),
    assignReasonToContext: assign((ctx, ev) => {
      return {
        reason: ev.value
      }
    }),
    assignEnabledToContext: assign((ctx, ev) => {
      return { enabled: true }
    }),
    assignDisabledToContext: assign((ctx, ev) => {
      return { enabled: false }
    })
  }
})