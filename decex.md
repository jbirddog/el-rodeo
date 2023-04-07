# On the Execution and Decomposition of BPMN Diagrams

_TODO: this started off all about execution but I think its really going to be about decomposition with a true parallel gateway and maybe some other handling. If so maybe this is just a summary of why we can decompose to gain implicit parallel execution?_

This document outlines a set of progressive enhancements to the current strategy for the execution of BPMN diagrams within [SpiffArena](https://github.com/sartography/spiff-arena) which leverages [SpiffWorkflow](https://github.com/sartography/SpiffWorkflow). The end goal is a more stable and performant system that is able to simulatenously execute multiple process instances ranging from small and simple to large and complex (such as MVP/PP1).

## Current State of Execution

Today SpiffArena has a sound execution environment for BPMN diagrams. For diagrams on the simpler side execution is very fast, often in the 10-100s of milliseconds range. Diagrams are primarily executed within a Flask request but can be handled by the background processor. Historically the background processor was used to handle timers and messages but it can run any non human task. 

Since SpiffArena executes diagrams within Flask requests and from the background processor, parallel execution of separate workflows is provided. There is no support for parallel execution of tasks within a single workflow however (true even when Parallel Gateways are used).

The Flask app and the background processor can be configured to use different strategies when executing diagrams. Currently the "greedy" strategy is used which simply runs all non human tasks until either the workflow completes or a human task is encountered. When executing this way the entire workflow is loaded and the available steps are executed. The advantage to this is simplicity, the downside is a long running process will block the request until it completes. This is perceived as slowness by the user while they are waiting on information after they press the "Run" or "Submit" button. If the background processor encounters a long running process it will block the thread until completion which often means other jobs are not run in a timely fashion.

## Enter the Interstitial Page

With the concept of the "interstitial page" and the different execution straties for the Flask requests and background processor, we can configure Flask requests to "run until a Service Task" and have the background processor be "greedy". This is a step closer to the end goal, but:

1. What if lots of things/a slow script happen before a Service Task?
1. What if hundreds of processes are started and shift all long running work to the "greedy" background processor?

With some progressive enhancements to the current execution model we can start to take steps to allevate these issues.

## Progressive Enhancements

_TODO: is there an order here?_

### More fine grained execution strategies

Currently the Flask app and background processor each have their own environment variable to set their diagram execution strategy. The current options are "greedy" or "run_until_service_task". These environment variables are defaults but nothing ever overrides them. It would be nice to have the ability to detect the appropriate execution strategy for a given set of tasks, perhaps at save/upload time. This could be done by inspecting the task tree. An example benefit here would be a simple diagram could be run "greedy" by the Flask app but a more complex diagram would created but offloaded to the background processor for execution.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


_TODO: some more points to incorporate:_

4. like other applications, the serial strategy could be the fastest
5. no reason not to fall back to the current model if needed (transition or how it is)
6. the agenda here could not have been addressed 9mo ago without 9mo work (individual task handling, run task)
7. DOS doesn't even have to be a long running task, time.sleep(1000000000000) will work
8. ^ migitate by running each task, having history - think pure/const tasks also

_END TODO_

_TODO: the main angle here is besides a true parallel gateway nothing much changes with regards to the current execution. What is executed however is subject to change._

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

Historically the current execution model has proven acceptable with simplier, smaller workflows - in fact they can complete in milliseconds on commodity hardware. The introduction of larger and more complex workflows such as the MVP process and PP{1,N} which require hundreds of tasks, nested `Call Activities` and numerous `Service Tasks` have shown the current execution model does not scale with the complexity of an individual process model. These long running instances manifest as long pauses in the UI - sometimes tens of seconds to minutes. 

The first step to a solution is to move all task execution to the background processor and have the UI render the interstitial page. Once more Activities are moved to the background processor the inital UI pause will subside but all processes will be serialized while they are processed by a single background thread. This can be midigated by adding more workers but the larger issues still exists - if a single process instance takes minutes to run it will hold a thread for the entire duration of its execution. This will result in the perception of slower processing of all process instances. If a long running process is instantiated by multiple users the entire system could be susceptible to a denial of service.

It should be noted this problem is not isolated to just the background worker - it is just easier to see there in the current configuration. Without the background processor the same issues would happen with 10s-100s of concurrent users.


