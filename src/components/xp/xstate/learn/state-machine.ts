
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

/** @xstate-layout N4IgpgJg5mDOIC5QFsCGBjAFgSwHZgDoAHbdAawBUAnVCMAYgHEB5AfQDkBRADQoG0ADAF1EoIgHtY2AC7ZxuUSAAeiAKwAmAgA51AFlW7dARlUA2AQE5TFrboA0IAJ6Jd61QQDMA0x4-qA7Fqmpv4CqgC+4Q5oWHiEJOTUtAycAG5guNIABOqCIkggElKy8ooqCOrqRgTqFqpG-vrBRurWqg7OCIbuplpaqpYCfl4eRqaR0Rg4+AQw0gCKAK7i0gwsrABCAIIAwgDSeYpFMnIKBeUAtEYCWgQaI9d6rloW-h2IHhbVRsamxgG6F66DwTEAxaaEOZLFZrNhcXiHArHEpnUDlXQCAgYoxGLSBBqqDwGN5ONTGO5uUKmMYWQyWUHguIEABG4nElBodCYbG2+0RYkkJ1K50QVwEmlM6hGBiGfWCHneCAM1Q0qn8tV01NpwQZUyZrPZSS563h-GER0FKLKLkxWi8Wmu-g0lgx7VJCF6t01owEDXFPwsFl1sRmeFg0ioi3Q0gACqhHMgMtJuZtdgdzUjLadrQgxRKpeL-D5XrjFdYPARGiY-bjzOotJEoiBcOI6PACoz8BbitmRbmTKYKQ9xYZ669FZVB7p-B4dPaXrOIk3O-FSBzkt2hajlB9MbjQkSifpKn51IrRhXXrOAl5dIHPsGIbMwAtlqtN1a+6p3GYdHaNa4lSKneugELSAj+FYHiavoZj+I++psuudAfr2aIfBWUqhIS36fBBdplm4YE+N4WHFkMCGhrg4aRtGcYJkmqHCuhFS3JK6pQX8Nz6CYipFpoAy9CEkG2MWjbhEAA */
createMachine({
  id:"machine",

  states: {
    pickTrade: {
      entry:"loadTrades",
      invoke:{
        src:"asadadad",
        onDone
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