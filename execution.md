# On the Execution of BPMN Diagrams

This document details a multi-faceted strategy for the execution of BPMN diagrams. The execution environment is assumed to be [SpiffArena](https://github.com/sartography/spiff-arena) which leverages [SpiffWorkflow](https://github.com/sartography/SpiffWorkflow).

To the best of my understanding everything is valid with regards to [the spec](https://www.omg.org/spec/BPMN/2.0/PDF) (see chapter 13). If any caveats exist we assume that the absense of the `isImmediate` attribute on `Sequence Flows` means _false_. Further we also assume this is always absent (since it is today). With that we quote:

```
Token movement across a Sequence Flow does not have any timing constraints. A token might take a long or short time
to move across the Sequence Flow. If the isImmediate attribute of a Sequence Flow has a value of false, or has
no value and is taken to mean false, then Activities not in the model MAY be executed while the token is moving along
the Sequence Flow. If the isImmediate attribute of a Sequence Flow has a value of true, or has no value and is
taken to mean true, then Activities not in the model MAY NOT be executed while the token is moving along the
Sequence Flow.
```

