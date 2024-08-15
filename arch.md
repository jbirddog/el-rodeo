## Major Components

1. Specs
2. Execution

### Specs

Main objective of this component is to translate one or more bpmn files into spec json. 
Bpmn files can be processes separately or in batches. The process of converting to spec 
json files would also surface (some) errors in the diagrams.

Additionally the response could contain:

1. a breakdown of a subset of the specs required to execute from a given of element id.
2. an optimized version of the spec that may not match the literal diagram.

This would be a completely stateless service. Storage of bpmn and spec json files would be 
left up to the caller.

Requirements: SpiffWorkflow

### Execution
