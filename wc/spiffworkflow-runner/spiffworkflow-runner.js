
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
  
  constructor() {
    super()
  }

  async connectedCallback() {
    this.apiKey = this.getAttribute("apiKey");
    this.shadow = this.attachShadow({ mode: "open" });

    this.slotLoading.setAttribute("name", "WorkflowLoading");
    this.slotLoading.innerHTML = '<p>Loading Workflow...</p>';

    this.shadow.innerHTML = `
      <style>
        .workflow {
          border: solid 1px aqua;
          margin: 3em;
	  padding: 2em;
        }
      </style>
      
      <div id="workflow" class="workflow">
      </div>
    `;
    
    const wrapper = this.shadow.getElementById("workflow");
    wrapper.replaceChildren(this.slotLoading);
    
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

    //wrapper.textContent = JSON.stringify(this.pendingTasks);
  }
}

customElements.define('spiffworkflow-runner', SpiffWorkflowRunner)
