
export class SpiffWorkflowRunner extends HTMLElement {
  static observedAttributes = ["apiKey"]
  apiKey = null;
  completed = false;
  pendingTasks = [];
  runner = 'http://localhost:8100'
  state = {};
  status = null;
  
  constructor() {
    super()
  }

  async connectedCallback() {
    this.apiKey = this.getAttribute("apiKey");
    const shadow = this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("div");
    
    wrapper.setAttribute("class", "wrapper");
    wrapper.textContent = `Loading... ${this.apiKey}`;

    const style = document.createElement("style");
    style.textContent = `
      .wrapper {
        border: solid 1px aqua;
        margin: 3em;
	padding: 2em;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);

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
    
    wrapper.textContent = JSON.stringify(this.pendingTasks);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define('spiffworkflow-runner', SpiffWorkflowRunner)
