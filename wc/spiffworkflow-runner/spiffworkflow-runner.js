
class SpiffWorkflowRunner extends HTMLElement {
  static observedAttributes = ["apiKey"];
  apiKey = null;
  completed = false;
  pendingTasks = [];
  runner = 'http://localhost:8100';
  shadow = null;
  state = {};
  status = null;

  slotComplete = document.createElement("slot");
  slotLoading = document.createElement("slot");
  slotManualTask = document.createElement("slot");

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

    this.status = json.status ?? 'error';
    this.completed = json.completed ?? false;
    this.state = { state: json.state ?? {} };
    this.pendingTasks = json.pending_tasks ?? [];

    if (this.completed) {
      this.renderCompletion();
    } else {
      this.renderPendingTasks();
    }
  }

  renderCompletion() {
    this.elWorkflow.replaceChildren(this.slotComplete);
  }

  renderPendingTasks() {
    const tasksBySpec = this.pendingTasks.reduce((a, c) => ({[c.task_spec.typename]: c, ...a }), {})
    var slots = [];

    if (tasksBySpec.ManualTask) {
      const id = tasksBySpec.ManualTask.id;
      const data = {};
      const taskSpec = tasksBySpec.ManualTask.task_spec;
      const instructions = taskSpec.extensions.instructionsForEndUser;
      const templateId = this.getAttribute("manualTaskTemplateId");      
      const template = templateId ? document.getElementById(templateId) : null;

      if (template) {
        const content = template.content.cloneNode(true);

        const elName = document.createElement("span");
        elName.slot = "ManualTaskName";
        elName.innerText = taskSpec.bpmn_name;

        this.elWorkflow.replaceChildren(content);
        this.appendChild(elName);
      }
      
      /*
      console.log(this.id);
      console.log(template);
      

      const slotName = this.slotManualTask.querySelector("slot[name='ManualTaskName']");
      const slotInstructions = this.slotManualTask.querySelector("slot[name='ManualTaskInstructions']");
      
      slotName.innerHTML = `<b>${taskSpec.bpmn_name}</b>`;
      slotInstructions.innerHTML = `<p>${instructions}</p>`;

      const completer = document.createElement("button");
      completer.innerText = "Complete";
      completer.onclick = () => {
        completer.disabled = true;
        this.runWorkflow({ completed_tasks: [{ id, data }]});
      }
      
      this.slotManualTask.appendChild(completer);
      slots.push(this.slotManualTask);
      */
    }
    
    //this.elWorkflow.replaceChildren(...slots);
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
    this.elWorkflow.replaceChildren(this.slotLoading);

    this.slotManualTask.setAttribute("name", "ManualTask");
    this.slotManualTask.innerHTML = `
      <p><slot name="ManualTaskName"></slot></p>
      <p><slot name="ManualTaskInstructions"></slot></p>
    `;

    this.slotComplete.setAttribute("name", "WorkflowComplete");
    this.slotComplete.innerHTML = '<p>This Workflow has been completed.</p>';
  }
}

customElements.define('spiffworkflow-runner', SpiffWorkflowRunner)
