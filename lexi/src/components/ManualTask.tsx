import { marked } from 'marked';

interface keyable {
  [key: string]: any; // eslint-disable-line
}

export const ManualTask = ({
  taskId,
  taskData,
  instructions,
  completer,
}: {
  taskId: string,
  bpmnId: string,
  taskData: keyable,
  instructions: string,
  completer(bpmnId: string, data: keyable): void,
}) => {
  const markedInstructions = marked.parse(
    instructions.replace(
      /\{\{(.+)\}\}/g,
      (_, p1: string) => taskData[p1.trim()],
    ),
  )

  return (
    <>
      <div className="manualTask instructions" dangerouslySetInnerHTML={{ __html: markedInstructions }} />
      <button
        onClick={() => completer(taskId, {})}
        data-testid="continue">
        Continue
      </button>
    </>
  )
}
