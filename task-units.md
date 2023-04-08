# On the Execution and Decomposition of BPMN Diagrams via Task Units

_TODO: this started off all about execution but I think its really going to be about decomposition with a true parallel gateway and maybe some other handling. If so maybe this is just a summary of why we can decompose to gain implicit parallel execution via task units?_

This document outlines a set of progressive enhancements to the current strategy for the execution of BPMN diagrams within [SpiffArena](https://github.com/sartography/spiff-arena) which leverages [SpiffWorkflow](https://github.com/sartography/SpiffWorkflow). The end goal is a more stable and performant system that is able to simulatenously execute multiple process instances ranging from small and simple to large and complex (such as MVP/PP1).

## Current State of BPMN Execution in SpiffArena

Today SpiffArena has a sound execution environment for BPMN diagrams. For diagrams on the simpler side execution is very fast - often measured in milliseconds. Diagrams are primarily executed within a Flask request but can be handled by the background processor. Historically the background processor was used to handle events such as timers but it can run any non human task. 

Since SpiffArena executes diagrams within Flask requests and from the background processor, parallel execution of separate workflows is provided. There is no support for parallel execution of tasks within a single workflow however (true even when Parallel Gateways are used).

The Flask app and the background processor can be configured to use different strategies when executing diagrams. Currently the "greedy" strategy is used which simply runs all non human tasks until either the workflow completes or a human task is encountered. When executing this way the entire workflow is loaded and the available steps are executed. The advantage to this is simplicity, the downside is a long running process will block the request until it completes. This is perceived as slowness by the user while they are waiting on information after they press the "Run" or "Submit" button. If the background processor encounters a long running process it will block the thread until completion which often means other jobs are not run in a timely fashion.

## Enter the Interstitial Page

With the concept of the "interstitial page" and the different execution straties for the Flask requests and background processor, we can configure Flask requests to "run until a Service Task" and have the background processor be "greedy". This is a step closer to the end goal, but:

1. What if lots of things/a slow script happen before a Service Task?
1. What if a large number of processes are started and shift all long running work to the single "greedy" background processor?

With some progressive enhancements to the current execution model we can start to take steps to allevate these issues.

## Progressive Enhancements

Core to these progressive enhancements are the concept of "Task Units". Task units are any grouping of tasks that can be run together in isolation. Task units can be formed from other task units or may be a single task. How task units are formed from decomposing diagrams and how this promotes efficient parallel execution will be described in more detail below.

Since an entire workflow is itself a task unit, the enhancements described below can be worked on iteratively. As task units become more granular the effects multiply across the enhancements.

### Progressively Identify and Execute Task Units

As mentioned above, a "task unit" is any grouping of tasks that can be run together in isolation. A task unit can be comprised of other task units - for instance an entire workflow is a task unit. Each branch within a Parallel Gateway could be considered its own task unit, as could a Service Task that has no variable input. Today the entire workflow is required to perform a single engine step. If we progressively identify task units that are smaller in scope than the entire workflow, we could load less into memory to perform a single step. This can be achieved by placing a task unit inside an empty workflow for execution. As task units become smaller we also gain a greater ability to stop a long running subportion of a workflow. We can't just kill PP1 after 30 seconds of execution, but we could realize that a task unit of 3 tasks should never take that long.

Since an entire workflow is a valid task unit, if we ever encounter a process model that we do not yet know how to identifiy task units of smaller scope, we can always fall back to executing the entire workflow as we do today.

### Task Unit Based Execution Strategies

Currently the Flask app and background processor each have their own environment variable to set their execution strategy. The current options are "greedy" or "run_until_service_task". These environment variables are defaults but nothing ever overrides them. It would be nice to have the ability to detect the appropriate execution strategy for any given task unit. This could be done by inspecting the task tree (possibly at save/upload time). As task units become more granular this would allow for more specialized step execution, as well as utilizing different execution strategies for subportions of a workflow. Some form of "cost" for a given task unit could also be considered when determining the execution strategy.

It should be noted that for some task units, being executed in the Flask request will be the fastest option.

### Add Truly Parallel Gateway(s)

The existing Parallel Gateway implementation does not actually result in parallel execution. Since each branch of a Parallel Gateway is a task unit and task units by definition can run in isolation we should be able to achieve parallel execution just as we do for separate workflows. Specialized Parallel Gateway implementations could be defined for specific scenarios. For instance if the Parallel Gateway was comprised of only Service Tasks it could be executed differently than one that contained human tasks.

### Add More Specialized Background Processing Jobs

Today the background processor has two specialized jobs - one for "waiting" instances and one for "user_input_required" instances which checks for an associated timer event. For the "waiting" process instances we don't really know anything about what it is waiting on, so the whole process instance is loaded and engine steps are done. If the background processor were able to know more about the waiting task unit for process instances, we could have specialized background jobs for certain scenarios. For instance one background job could "run_until_service_task" and take care of lots of cheap tasks across many process instances. Then another background job could scan for all the "waiting on a service task to be run" processes. It could then take the next task unit from each of these processes and form a temporary workflow with a truly Parallel Gateway. The results of each response will be placed back in their respective workflows. All while the first background job is continuing to churn on "quick" tasks.

### Cooperatively Execute Process Instances in the Background

The background processor attempts to execute any waiting process instance to completion. To elaborate on the "what if" scenario from above - imagine a case where a large number of PP1 instances have been started and are "waiting" in the background. If each instance takes tens of seconds or minutes to complete the background processor will quickly become overwhelmed. Running more jobs will help some but in truth will only allow a few more instances to complete. Since the entire workflow is required to complete an engine step, it is prohibitivly expensive to perform a single step. Once task units become more granular and are the target of execution it will be cheaper to execute a small amount of steps at a time. When this can be realized then all workflows can be cooperatively executed. Task unit boundaries will serve as a yield point in the larger workflow execution.

### Apply Known Optimizations to Task Units

When task units are small in scope it would be much easier to apply known and safe optimizations to further improve runtime performance. It is feasible that performing some basic optimizations such as constant propagation/folding would result in "unused variables". Once those are removed then dependencies between task units could be severed. Once two previously dependant task units are separated they can both be run in parallel.

[Some Examples](https://github.com/jbirddog/mamba)

## Forming Task Units by Decomposing BPMN Diagrams

To re-iterate, an entire workflow as we think of it today is itself a task unit. The progressive enhancements described above become more impactful as the task units become more granular. The question then becomes - how can we safely extract task units from any BPMN diagram? 

## How Task Units Promote Parallel Execution of BPMN Diagrams

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


