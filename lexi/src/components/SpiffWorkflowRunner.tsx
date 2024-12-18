import { useEffect, useState } from 'react'
import { BoundaryEvent } from './BoundaryEvent'
import { ManualTask } from './ManualTask'
import { UserTask } from './UserTask'

interface keyable {
  [key: string]: any; // eslint-disable-line
}

//const remoteRunner = "http://localhost:8100"
const remoteRunner = "https://myapi.spiff.works"

const startParams = {
  start: {
    process_id: "Process_start_a_company_ow48of2",
    data: {
      "ein_status": "I do not have and EIN and I am sure that I need one",
    },
  }
}

export const SpiffWorkflowRunner = ({ apiKey, schemaMap }: { apiKey: string, schemaMap: keyable }) => {
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState('')
  const [pendingTasks, setPendingTasks] = useState([])
  const [workflowState, setWorkflowState] = useState({})

  const runWorkflow = async (additionalBody: keyable) => {
    const resp = await fetch(`${remoteRunner}/v0/do/${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...workflowState,
        ...additionalBody,
      }),
    })

    const json = await resp.json();

    setCompleted(json.completed ?? false)
    setError(json.message ?? '')
    setPendingTasks(json.pending_tasks ?? [])
    setWorkflowState(json.state ? { state: json.state } : {})
  };

  useEffect(() => {
    runWorkflow(startParams);
  }, []); // eslint-disable-line

  const completeTask = (id: string, data: keyable) => {
    runWorkflow({ completed_tasks: [{ id, data }] })
  };

  const componentForTaskSpec = (task: keyable) =>
    task.task_spec.typename == 'ManualTask' ? (
      <ManualTask
        key={task.id}
        taskId={task.id}
        bpmnId={task.task_spec.bpmn_id}
        taskData={task.data}
        instructions={task.task_spec.extensions.instructionsForEndUser ?? ''}
        completer={completeTask}
      />
    ) : task.task_spec.typename == 'UserTask' ? (
      <UserTask
        key={task.id}
        taskId={task.id}
        bpmnId={task.task_spec.bpmn_id}
        taskData={task.data}
        instructions={task.task_spec.extensions.instructionsForEndUser ?? ''}
        schema={schemaMap[task.task_spec.extensions.properties.formJsonSchemaFilename]}
        uiSchema={schemaMap[task.task_spec.extensions.properties.formUiSchemaFilename]}
        completer={completeTask}
      />
    ) : task.task_spec.typename == 'BoundaryEvent' ? (
      <BoundaryEvent
        key={task.id}
        taskId={task.id}
        bpmnId={task.task_spec.bpmn_id}
        buttonLabel={task.task_spec.extensions.signalButtonLabel ?? 'Boundary Event'}
        completer={completeTask}
      />
    ) : (
      <div key={task.id}>Unsupported task type: {task.task_spec.typename}</div>
    );
  
  return <div className="card">
    {error ? <div className="error">Error: {error}</div>
    :completed === false && pendingTasks.length === 0 ? (
      <div>Loading...</div>
    ) : completed === true ? (
      <div>
        <h3>Workflow Complete!</h3>
        <button
          onClick={() => {
            setWorkflowState({})
            runWorkflow(startParams)
          }}
          data-testid="clear-data"
	>
          Do it again
        </button>
      </div>
    ) : (
      <div>{pendingTasks.map(p => componentForTaskSpec(p))}</div>
    )}
  </div>
}
