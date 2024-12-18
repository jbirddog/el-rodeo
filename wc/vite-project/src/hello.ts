// local
const workflowRunner = 'http://localhost:8100'
//const workflowApiKey = '31200470-da18-48f9-8ba1-6225be674c33'

// prod
//const workflowRunner = 'https://john-dark-meadow-5957.fly.dev';
//const workflowApiKey = 'e5116459-c1d2-4dbe-aaea-7911a0c115bc';

export class SpiffWorkflowRunner extends HTMLElement {
  static observedAttributes = ["apiKey"]
  
  constructor() {
    super()
  }

  async connectedCallback() {
    const apiKey = this.getAttribute("apiKey")
    const shadow = this.attachShadow({ mode: "open" })
    const wrapper = document.createElement("div")
    
    wrapper.setAttribute("class", "wrapper")
    wrapper.textContent = `Loading... ${apiKey}`

    const style = document.createElement("style")
    style.textContent = `
      .wrapper {
        border: solid 1px aqua;
        margin: 3em;
	padding: 2em;
      }
    `

    shadow.appendChild(style)
    shadow.appendChild(wrapper)

    const workflowState = {}
    const additionalBody = {}


    const resp = await fetch(`${workflowRunner}/v0/do/${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...workflowState,
        ...additionalBody,
      }),
    });

    const json = await resp.json();
    console.log(json)
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.")
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.")
  }

  attributeChangedCallback(name: string, _oldValue: string, _newValue: string) {
    console.log(`Attribute ${name} has changed.`)
  }  
}
