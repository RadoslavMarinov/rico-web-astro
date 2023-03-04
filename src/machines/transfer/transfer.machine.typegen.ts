
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.Transfer Machine.Choose Beneficiaries.Load Beneficiaries:invocation[0]": { type: "done.invoke.Transfer Machine.Choose Beneficiaries.Load Beneficiaries:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.Transfer Machine.Loading Trades:invocation[0]": { type: "done.invoke.Transfer Machine.Loading Trades:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getTrades": "done.invoke.Transfer Machine.Loading Trades:invocation[0]";
"loadBeneficiaries": "done.invoke.Transfer Machine.Choose Beneficiaries.Load Beneficiaries:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "getTrades" | "loadBeneficiaries";
        };
        eventsCausingActions: {
          "assignBeneficiariesToContext": "done.invoke.Transfer Machine.Choose Beneficiaries.Load Beneficiaries:invocation[0]";
"assignCurrentTrade": "Trade Select";
"assignQuoteFormInputToContext": "QUOTE_READY";
"assignTradesToContext": "done.invoke.Transfer Machine.Loading Trades:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "Has Trades": "done.invoke.Transfer Machine.Loading Trades:invocation[0]";
"Has Trades in Context": "GO_BACK";
        };
        eventsCausingServices: {
          "getTrades": "GO_BACK" | "xstate.init";
"loadBeneficiaries": "Trade Select";
        };
        matchesStates: "Book Trade" | "Choose Beneficiaries" | "Choose Beneficiaries.Load Beneficiaries" | "Choose Beneficiaries.Select Beneficiaries" | "Error" | "Get Quote" | "Instructing Payment" | "Loading Trades" | "Pick Trade" | { "Choose Beneficiaries"?: "Load Beneficiaries" | "Select Beneficiaries"; };
        tags: never;
      }
  