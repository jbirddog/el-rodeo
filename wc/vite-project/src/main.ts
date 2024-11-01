import './style.css'
import { SpiffWorkflowRunner } from './hello.ts'

customElements.define('spiffworkflow-runner', SpiffWorkflowRunner)

/*
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <spiffworkflow-runner apiKey="bob">
      <div>hi</div>
    </spiffworkflow-runner>

    <spiffworkflow-runner apiKey="joe">
      <div>hi2</div>
    </spiffworkflow-runner>
  </div>
`
*/
