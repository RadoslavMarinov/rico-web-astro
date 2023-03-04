
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "assignAmountToContext": "SET_AMOUNT";
"assignDisabledToContext": "DISABLE";
"assignEnabledToContext": "ENABLE";
"assignReasonToContext": "SET_REASON";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          
        };
        matchesStates: "Disabled" | "Enabled" | "Enabled.Filling" | { "Enabled"?: "Filling"; };
        tags: never;
      }
  