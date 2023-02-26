import { createMachine } from 'xstate'
import { Trade } from "../../models/trade/Trade"

export const transferMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBDAdrAZmVABALLoDGAFgJaZgB0ADpaQNZroRgDEEA9jbdQBuPZnTbY8hEhWp1GLNhwRCepdABdKfANoAGALp79iUPR6xKmviZAAPRAEYArABZaDlwGYATAA5dAJyeugBs3k4A7C4ANCAAnogAtK603gERri4uurqeLiE+TgC+RbHiuPjEZFT88qwYHJz4qDyoDAA2GjitALa05ZJVMrVM9exgypjCalaYRkY2ZhazNvYIiREBtDkOIZEB3p6bfrEJCA6eTrS+ISGBhx5OITe+JaUgmDwc8EggA5XSGpgRbmSxaTCrJIObwRba6Xb7Q7HXynKEhBy0TwBbG+J75Tw3I4lMoYCQA6qyBijRTA35LMHWX5rZJXBw47ERDzpZwxeJJCKea7Y7GXLxHbLeYl-UkVKQU-gwdQARQArjx1LTTKCVkzEC5-LQwr4bocdq4UXz1k5dJjhQFdgFjQ5fBEpf85cM6M1WiDluDIec8qkcrpDmL0ekLWddoLAhyAk4groXBdXm8gA */
  createMachine({
    id: "Transfer Machine",
    initial: "pickTrade",
    schema: {
      services: {} as {
        'getTrades': {
          data: Trade[]
        }
      }
    },
    states: {
      pickTrade: {
        invoke: {
          src: "getTrades", // The name of the service
          onDone: [{
            target: "getQuote"
          }],
          onError: [{
            target: "error"
          }]
        }
      },
      getQuote: {},
      error: {}
    },

  }, {
  })