# On the Execution and Decomposition of BPMN Diagrams

## Execution

_TODO: this started off all about execution but I think its really going to be about decomposition with a true parallel gateway and maybe some other handling. If so maybe this is just a summary of why we can decompose to gain implicit parallel execution?_

This document details a multi-layered/faceted? strategy for the execution of BPMN diagrams. The execution environment is assumed to be [SpiffArena](https://github.com/sartography/spiff-arena) which leverages [SpiffWorkflow](https://github.com/sartography/SpiffWorkflow).

It is believed that everything is valid with regards to [the spec](https://www.omg.org/spec/BPMN/2.0/PDF) (namely chapter 13) - at least as much as it is currently. If any caveats exist we assume that the absense of the `isImmediate` attribute on `Sequence Flows` means _false_. Further we also assume this is always absent (as it is today). With that we quote:

```
Token movement across a Sequence Flow does not have any timing constraints. A token might take a long or short time
to move across the Sequence Flow. If the isImmediate attribute of a Sequence Flow has a value of false, or has
no value and is taken to mean false, then Activities not in the model MAY be executed while the token is moving along
the Sequence Flow. If the isImmediate attribute of a Sequence Flow has a value of true, or has no value and is
taken to mean true, then Activities not in the model MAY NOT be executed while the token is moving along the
Sequence Flow.
```

For the sake of this document the above passage distills to the following points:

1. Token movement across a Sequence Flow does not have any timing constraints.
2. If the isImmediate attribute of a Sequence Flow has a value of false, or has no value and is taken to mean false, then Activities not in the model MAY be executed while the token is moving along the Sequence Flow.

With the assumption that the absense of the `isImmediate` attribute on `Sequence Flows` means _false_ we can further distill to:

1. Token movement across a Sequence Flow does not have any timing constraints.
2. Activities not in the model MAY be executed while the token is moving along the Sequence Flow.

These two items will serve as the basis for the purposed execution model.

Theoretically speaking this means that under the right circumstances many `Activities` can be executed in parallel.

At the time of writing `SpiffArena` does execute `Activities` from separate models in parallel. This is handled by a combination of separate Flask requests and the background processor running separate process instances. Activities within a given process instance however are not run in parallel.

## What?

does this do to the footnote?
