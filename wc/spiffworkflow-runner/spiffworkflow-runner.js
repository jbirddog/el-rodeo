
export class SpiffWorkflowRunner extends HTMLElement {
  static observedAttributes = ["apiKey"];
  apiKey = null;
  completed = false;
  pendingTasks = [];
  runner = 'http://localhost:8100';
  state = {};
  status = null;
  
  constructor() {
    super()
  }

  async connectedCallback() {
    this.apiKey = this.getAttribute("apiKey");
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .wrapper {
          border: solid 1px aqua;
          margin: 3em;
	  padding: 2em;
        }
      </style>
      
      <div id="wrapper" class="wrapper">
        <slot name="ManualTask">MANUAL_TASK SLOT</slot>
      </div>
    `;
    
    /*
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "wrapper");
    wrapper.textContent = `Loading... ${this.apiKey}`;

    const template = document.createElement("template");
    template.setAttribute("id", "swr-template");
    template.content.appendChild(wrapper);

    const style = document.createElement("style");
    style.textContent = `
      .wrapper {
        border: solid 1px aqua;
        margin: 3em;
	padding: 2em;
      }
    `;
    
    shadow.appendChild(style);
    shadow.appendChild(template.content.cloneNode(true));
    */
    
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

    const wrapper = shadow.getElementById("wrapper");
    //wrapper.textContent = JSON.stringify(this.pendingTasks);
  }
}

customElements.define('spiffworkflow-runner', SpiffWorkflowRunner)
