
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.Transfer Machine.Loading Trades:invocation[0]": { type: "done.invoke.Transfer Machine.Loading Trades:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getTrades": "done.invoke.Transfer Machine.Loading Trades:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "getTrades";
        };
        eventsCausingActions: {
          "assignCurrentTrade": "Trade Select";
"assignQuoteFormInputToContext": "Input Change";
"assignTradesToContext": "done.invoke.Transfer Machine.Loading Trades:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "Has Trades": "done.invoke.Transfer Machine.Loading Trades:invocation[0]";
        };
        eventsCausingServices: {
          "getTrades": "xstate.init";
        };
        matchesStates: "Error" | "Get Quote" | "Get Quote.Fill Form" | "Instructing Payment" | "Loading Trades" | "Pick Trade" | { "Get Quote"?: "Fill Form"; };
        tags: never;
      }
  