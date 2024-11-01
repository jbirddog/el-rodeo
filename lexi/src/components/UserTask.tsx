import Form from '@rjsf/core'
import { RJSFSchema } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import { marked } from 'marked'

interface keyable {
  [key: string]: any; // eslint-disable-line
}

export const UserTask = ({
  taskId,
  taskData,
  instructions,
  schema,
  uiSchema,
  completer,
}: {
  taskId: string,
  bpmnId: string,
  taskData: keyable,
  instructions: string,
  schema: keyable,
  uiSchema: keyable,
  completer(taskId: string, data: keyable): void,
}) => {
  const markedInstructions = marked.parse(instructions)

  const loweredSchema = lowerSpiffArenaSchemaToRJSFSchema(schema, taskData)
  
  return <>
      {markedInstructions
        && <div className="userTask instructions" dangerouslySetInnerHTML={{ __html: markedInstructions }}></div>}
      <div>
        <Form
	  formData={taskData}
	  schema={loweredSchema}
	  uiSchema={uiSchema}
	  validator={validator}
	  onSubmit={({ formData }) => completer(taskId, formData)}
	/>
      </div>
  </>
}

const taskDataOptions = /"options_from_task_data_var:([^"]+)"/g

const lowerSpiffArenaSchemaToRJSFSchema = (schema: keyable, taskData: keyable): RJSFSchema => {
  const lowered = JSON.stringify(schema).replace(taskDataOptions, (_, v) => {
    const options = taskData[v].map(({ value, label }: { value: string, label: string}) =>
      `{"type": "string", "enum": ["${value}"], "title": "${label}"}`
    )
    
    return `${options.join(",")}`
  })
  
  return JSON.parse(lowered)
}
