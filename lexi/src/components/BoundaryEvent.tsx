
interface keyable {
  [key: string]: any; // eslint-disable-line
}

export const BoundaryEvent = ({
  taskId,
  buttonLabel,
  completer,
} : {
  taskId: string,
  bpmnId: string,
  buttonLabel: string,
  completer(bpmnId: string, data: keyable): void,
}) => {
  return <button
    onClick={() => completer(taskId, {})}
    data-testid="signal-button">
    {buttonLabel}
  </button>
}
