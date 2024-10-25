
const manualTaskDefaultTemplateStr = `
  <p><b><slot name="bpmnName"></slot></b></p>
  <p><slot name="instructions"></slot></p>
  <div><slot name="actions"></slot></div>
`;

const userTaskDefaultTemplateStr = `
  <p><b><slot name="bpmnName"></slot></b></p>
  <p><slot name="instructions"></slot></p>
  <div><slot name="actions"></slot></div>
`;


class SpiffWorkflowRunner extends HTMLElement {
  static observedAttributes = ["apiKey"];
  apiKey = null;
  completed = false;
  pendingTasks = [];
  result = {};
  runner = 'http://localhost:8100';
  shadow = null;
  state = {};
  status = null;

  slotComplete = document.createElement("slot");
  slotLoading = document.createElement("slot");

  templateManualTask = null;

  elWorkflow = document.createElement("div");
  
  constructor() {
    super()
  }

  async connectedCallback() {
    this.apiKey = this.getAttribute("apiKey");
    this.shadow = this.attachShadow({ mode: "open" });

    this.initElements();
    this.runWorkflow({});
  }

  async runWorkflow(additionalBody) {
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

    this.completed = json.completed ?? false;
    this.pendingTasks = json.pending_tasks ?? [];
    this.result = json.result ?? {};
    this.state = { state: json.state ?? {} };
    this.status = json.status ?? 'error';

    if (this.completed) {
      this.renderCompletion();
    } else {
      this.renderPendingTasks();
    }
  }

  renderCompletion() {
    console.log(this.state);
    this.elWorkflow.innerHTML = `
      <p>This Workflow has been completed.</p>
      <p>Result:</p>
      <pre style="text-align: left;">${JSON.stringify(this.result, null, 2)}</pre>
    `;
  }

  renderPendingTasks() {
    const boundaryEvents = this.pendingTasks.filter(t => t.task_spec.typename === "BoundaryEvent");
    const tasksBySpec = this.pendingTasks.reduce((a, c) => ({[c.task_spec.typename]: c, ...a }), {})

    if (tasksBySpec.ManualTask) {
      this.renderManualTask(tasksBySpec.ManualTask, boundaryEvents);
    }
    else if (tasksBySpec.UserTask) {
      this.renderUserTask(tasksBySpec.UserTask, boundaryEvents);
    }
  }

  renderHumanTask(task, boundaryEvents, templateIdAttr, defaultTemplateStr) {
    const id = task.id;
    const data = {};
    const taskSpec = task.task_spec;
    const templateId = this.getAttribute(templateIdAttr);
    const template = templateId ? document.getElementById(templateId) : null;
    
    if (template) {
      const content = template.content.cloneNode(true);
      this.elWorkflow.replaceChildren(content);
    } else {
      this.elWorkflow.innerHTML = defaultTemplateStr;
    }

    const name = document.createElement("span");
    name.slot = "bpmnName";
    name.innerText = taskSpec.bpmn_name;

    const instructions = document.createElement("span");
    instructions.slot = "instructions";
    instructions.innerText = taskSpec.extensions.instructionsForEndUser;

    const actions = document.createElement("span");
    actions.slot = "actions";
    
    const submit = document.createElement("button");
    submit.innerText = "Submit";
    submit.onclick = () => {
      submit.disabled = true;
      this.runWorkflow({ completed_tasks: [{ id, data }]});
    }
    actions.appendChild(submit);

    boundaryEvents?.forEach(e  => {
      const btn = document.createElement("button");
      btn.innerText = e.task_spec.extensions.signalButtonLabel;
      btn.onclick = () => {
        btn.disabled = true;
        this.runWorkflow({ completed_tasks: [{ id: e.id, data: {} }]});
      }
      actions.appendChild(btn);
    });
    
    this.replaceChildren(name, instructions, actions);
    this.elWorkflow.setAttribute("pendingTaskId", task.id);
  }

  renderManualTask(task, boundaryEvents) {
    this.renderHumanTask(task, boundaryEvents, "manualTaskTemplateId", manualTaskDefaultTemplateStr);
  }
  
  renderUserTask(task, boundaryEvents) {
    this.renderHumanTask(task, boundaryEvents, "userTaskTemplateId", userTaskDefaultTemplateStr);
  }

  initElements() {
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

    this.slotLoading = this.shadow.getElementById("workflowLoadingSlot");

    this.elWorkflow = this.shadow.getElementById("workflow");
    this.elWorkflow.setAttribute('workflowId', this.id);
    this.elWorkflow.replaceChildren(this.slotLoading);

    this.elWorkflow.addEventListener("taskCompleted", (e) => {
      setTimeout(() => this.runWorkflow({ completed_tasks: [e.detail]}));
    }, false);

    this.slotComplete.setAttribute("name", "WorkflowComplete");
    this.slotComplete.innerHTML = '<p>This Workflow has been completed.</p>';
  }
}

customElements.define('spiffworkflow-runner', SpiffWorkflowRunner)
