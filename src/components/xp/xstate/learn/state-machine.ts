
import { createMachine } from 'xstate'

type EventType = "GO_NEXT" | "GO_BACK"
type States = "pickTrade" | "getQuote" | "bookTrade" | "instructPayment"

interface Event {
  type: EventType
}

interface EventNext extends Event { }

export const transferMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDp8B3AAlgBdUKxSBGAYgFEA3MXC+gbQAYBdRKAAOAe1jYK2EbkEgAHojoAWAOwE6ANhUBmAKw8AnCroGt2gEwAaEAE9E57Wt1KAHLoMuDp4+Y0aAvv7WaFh4hCTkVDSk5sxsHNz8sqLiktKyCggAtHQqLgQGvtouWiqmdDza1nYI5jy6Ba66nvrGmhq6gUEguCIQcLIhOPjJYhJSMkjyiFmOPAVFJSplGhVVtoi6Go1uhSo8lSaagcEYw+FgZJTUtHSjqRMZiNpKBC46zfVKGiX15krVRRKbQEJRNNzFTTGJQnEBDMJES6RG4xe7jdJTTJZZoLDTFUrlQ6AhDaHh0AgvNy7OgVOj42Hw-CIq5RWhKNFpSagLEWcy4-HLQnrGomAw7ZoGVo0vydLpAA */

/** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDp8B3AAlgBdUKxSBGAYgFEA3MXC+gbQAYBdRKAAOAe1jYK2EbkEgAHojoAWAOwE6ANhUBmAKw8AnCroGt2gEwAaEAE9E57Wt1KAHLoMuDp4+Y0aAvv7WaFh4hCTkVDSk5sxsHNz8sqLiktKyCggAtHQqLgQGvtouWiqmdDza1nYI5gZKBEqu7toaFroaJkqBQSC4IhBwsiE4+MliElIySPKIWY48BUUlKmWdldWIHQXNhSo8lSaagcEYo+FgZJTUtHTjqVMZiNoNLjq6LjzOGiVf5kqbBDKbSNZpuYqaYzdXojMJES6RG4xe6TdIzTJZD5LNorNYVbR0QHaHh0AgvNxuAx0Cp0YoBGFnOERa7RJQotLTUAYizmbF01blDa2RReHYUgz6YyaDS6Hr+IA */

/** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDoAHbdAawBUAnVCMAYgHEB5AfQDkBRADQoG0ADAF1EoIgHtY2AC7ZxuUSAAeiAEwAOAgE51A3QFYA7ADYAzAEZVWwwBYbAGhABPRKa3mC5m+bP6b+8xNDdX0AX1DHNCw8QhhpAEUAV3FpBhZWACEAQQBhAGlBESQQCSlZeUUVBABacz0CfVVTAQsBVTsNa0cXBDcPLx9vVVt1LRtTcMiMHHwCOKSUtLYuXkLFUpk5BWKqmwECPfNzdWDA-VM-Q27EPw9GowFjHzG9rUmQKJnCACNxcUoaHQmGxsvk1sUNuVtqAqrU2gRjE0Wn4Wup1MYzNcELcGqojFYbE8xhj3p8YgRfv9qLQlhwePxhOtJJsKjtEHsCOpmuo6oZGgIxgJ9FjjGiDmY6oE2l4tG8Ih9puS8LBpFREuhpAAFVBOZBgXDSYGZXIFRkQ5lQyqIOGqBFI4ZmazHEVaUwEWzmAKGATHYxtdSkxWzEjkalAzgAN310gABKpwWILVsrQhVKoPFYvf4MZZjFphc52f4EWj9AKWkiLMZwvLcOI6PBimT8Eyysm2TVPcZcc1Wu0bJ0roXU8MDoZTOo0+5DLKLGF5c3CCGATTWyzocpXPtjt6Lhd-GnTGmsRY3dYJ8NmjZZ3KptFZvNkqk15aOxZ3e19GXTLYtHpbAWPSEpo6LtEefoCIYli2IG94-H8K50C+7Ywq4bpNN65xfm4kFciKeLaGYjwYY6LSwV8BDKqq6pajqeoGshrKoammiIoYVhmMYezqP4npYiYtplqKxiGDOPGOjWoRAA */
createMachine({
  id:"machine",

  states: {
    pickTrade: {
      on: {
        GO_NEXT: "getQuote",
        "Event 2": {
          target: "instructPayment",
          cond: "New Guard"
        }
      }
    },

    getQuote: {
      on: {
        GO_BACK: "pickTrade",
        GO_NEXT: "bookTrade"
      }
    },

    bookTrade: {
      on: {
        GO_BACK: "getQuote",
        GO_NEXT: "instructPayment"
      }
    },

    instructPayment: {
      on: {
        GO_BACK: "bookTrade"
      }
    }
  },

  initial: "pickTrade"
})

// console.log(`Transfer Machine -> `, transferMachine)