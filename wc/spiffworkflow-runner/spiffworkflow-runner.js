
export class SpiffWorkflowRunner extends HTMLElement {
  static observedAttributes = ["apiKey"];
  apiKey = null;
  completed = false;
  pendingTasks = [];
  runner = 'http://localhost:8100';
  shadow = null;
  state = {};
  status = null;

  slotLoading = document.createElement("slot");
  slotManualTask = document.createElement("slot");

  templateManualTask = document.createElement("template");

  elWorkflow = document.createElement("div");
  
  constructor() {
    super()
  }

  async connectedCallback() {
    this.apiKey = this.getAttribute("apiKey");
    this.shadow = this.attachShadow({ mode: "open" });

    this.initElements();
    
    const additionalBody = {};

    const resp = await fetch(`${this.runner}/v0/do/${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...this.state,
        ...additionalBody,
      }),
    });

    const json = await resp.json();

    console.log(json);

    this.status = json.status ?? 'error';
    this.completed = json.completed ?? false;
    this.state = json.state ?? {};
    this.pendingTasks = json.pending_tasks ?? [];

    this.renderPendingTasks();
  }

  renderPendingTasks() {
    const tasksBySpec = this.pendingTasks.reduce((a, c) => ({[c.task_spec.typename]: c, ...a }), {})
    var slots = [];

    if (tasksBySpec.ManualTask) {
      const taskSpec = tasksBySpec.ManualTask.task_spec;
      const instructions = taskSpec.extensions.instructionsForEndUser;
      
      this.slotManualTask.innerHTML = `
        <div>
          <p><b>${taskSpec.bpmn_name}</b></p>
          <p>${instructions}</p>
          <button>Complete</button>
        </div>
      `
      slots.push(this.slotManualTask);
    }

    this.elWorkflow.replaceChildren(...slots);
  }

  initElements() {
    this.slotManualTask.setAttribute("name", "ManualTask");
    this.slotManualTask.innerHTML = '<p>Pending ManualTask...</p>';

    this.shadow.innerHTML = `
      <style>
        .workflow {
          border: solid 1px aqua;
          margin: 3em;
	  padding: 2em;
        }
      </style>
      
      <div id="workflow" class="workflow">
        <slot id="workflowLoadingSlot" name="WorkflowLoading">
          <p>Loading Workflow...</p>
        </slot>
      </div>
    `;

    this.templateManualTask.setAttribute("id", "tmpl-manual-task");
    this.templateManualTask.content.innerHTML = `
      <div>
        <slot name="ManualTaskInstructions">No instructions provided.</slot>
        <button>Complete</button>
      </div>
    `;

    this.slotLoading = this.shadow.getElementById("workflowLoadingSlot");
    
    this.elWorkflow = this.shadow.getElementById("workflow");
    this.elWorkflow.replaceChildren(this.slotLoading);
  }
}

customElements.define('spiffworkflow-runner', SpiffWorkflowRunner)
