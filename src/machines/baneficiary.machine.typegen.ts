
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
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
          "formReady": "";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "Disabled" | "Enabled" | "Enabled.Check Form Readiness" | "Enabled.Filling Form" | "Enabled.Form Ready" | { "Enabled"?: "Check Form Readiness" | "Filling Form" | "Form Ready"; };
        tags: never;
      }
  