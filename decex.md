# On the Execution and Decomposition of BPMN Diagrams

## Execution

_TODO: this started off all about execution but I think its really going to be about decomposition with a true parallel gateway and maybe some other handling. If so maybe this is just a summary of why we can decompose to gain implicit parallel execution?_

_TODO: some more points to incorporate:_

1. we have a sound execution environment today
2. however - it was designed for serial execution of a single process instance
3. background processor was only there for timers
4. like other applications, the serial strategy could be the fastest
5. no reason not to fall back to the current model if needed (transition or how it is)
6. the agenda here could not have been addressed 9mo ago without 9mo work (individual task handling, run task)
7. DOS doesn't even have to be a long running task, time.sleep(1000000000000) will work
8. ^ migitate by running each task, having history - think pure/const tasks also

_END TODO_

_TODO: the main angle here is besides a true parallel gateway nothing much changes with regards to the current execution. What is executed however is subject to change._

This document details an augmentation to the current strategy for the execution of BPMN diagrams within [SpiffArena](https://github.com/sartography/spiff-arena) which leverages [SpiffWorkflow](https://github.com/sartography/SpiffWorkflow).

It is believed that everything is as valid as it is today with regards to [the spec](https://www.omg.org/spec/BPMN/2.0/PDF) (namely chapter 13). If any caveats exist we assume that the absense of the `isImmediate` attribute on `Sequence Flows` means _false_. Further we also assume this is always absent (as it is today). With that we quote:

```
Token movement across a Sequence Flow does not have any timing constraints. A token might take a long or short time
to move across the Sequence Flow. If the isImmediate attribute of a Sequence Flow has a value of false, or has
no value and is taken to mean false, then Activities not in the model MAY be executed while the token is moving along
the Sequence Flow. If the isImmediate attribute of a Sequence Flow has a value of true, or has no value and is
taken to mean true, then Activities not in the model MAY NOT be executed while the token is moving along the
Sequence Flow.
```

For the sake of this document the above passage distills to the following quoted points:

1. Token movement across a Sequence Flow does not have any timing constraints.
2. If the isImmediate attribute of a Sequence Flow has a value of false, or has no value and is taken to mean false, then Activities not in the model MAY be executed while the token is moving along the Sequence Flow.

With the above assumption that the absense of the `isImmediate` attribute on `Sequence Flows` means _false_ we can further distill to our version:

1. Token movement across a Sequence Flow does not have any timing constraints.
2. Activities not in the model MAY be executed while the token is moving along the Sequence Flow.

**It is important to note that these two items will serve as the basis for the rest of the document.**

At the time of writing `SpiffArena` does execute `Activities` from separate models in parallel. This is handled by a combination of separate Flask requests and the background processor running separate process instances. Activities within a given process instance however are not run in parallel (this is true even for Parallel Gateways). It does not lock all Activities while another Activity is executing as the spec seems to suggest. We plan to continue in this tradition going forward (at least initially) but this does raise an interesting conversation with regards to multi-process interactions such as DataStores.

Historically the current execution model has proven acceptable with simplier, smaller workflows - in fact they can complete in milliseconds on commonity hardware. The introduction of larger and more complex workflows such as the MVP process and PP{1,N} which require hundreds of tasks, nested `Call Activities` and numerous `Service Tasks` have shown the current execution model does not scale with the complexity of an individual process model. These long running instances manifest as long pauses in the UI - sometimes tens of seconds to minutes. 

The first step to a solution is to move all task execution to the background processor and have the UI render the interstitial page. Once more Activities are moved to the background processor the inital UI pause will subside but all processes will be serialized while they are processed by a single background thread. This can be midigated by adding more workers but the larger issues still exists - if a single process instance takes minutes to run it will hold a thread for the entire duration of its execution. This will result in the perception of slower processing of all process instances. If a long running process is instantiated by multiple users the entire system could be suseptible to a denial of service.

It should be noted this problem is not isolated to just the background worker - it is just easier to see there in the current configuration. Without the background processor the same issues would happen with 10s-100s of concurrent users.


