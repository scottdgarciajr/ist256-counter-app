import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "Number Counter";
    this.min = 0;
    this.max = 10;
    this.counter = 5;
  }

  static get properties() {
    return {
      title: { type: String },
      min: { type: Number },
      max: { type: Number },
      counter: { type: Number, reflect: true }
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        padding: 16px; /* Spacing around the app */
        border-radius: 8px; /* Rounded corners */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Shadow for depth */
      }

      :host([counter="21"]) #counter {
        color: salmon; 
      }

      :host([counter="18"]) #counter {
        color: pink; 
      }

      .minmax {
        color: red;
      }

      .wrapper {
        text-align: center; /* Center align content */
      }

      .container {
        display: flex;
        justify-content: center; /* Center buttons and counter */
        align-items: center;
        margin-top: 16px; /* Space above the container */
      }

      .number {
        font-size: 4rem; /* Large font size for the number */
        margin: 0 16px; /* Spacing around the number */
        font-weight: bold; /* Bold text for emphasis */
      }

      button {
        background-color: var(--ddd-theme-primary);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px; /* Spacing inside buttons */
        margin: 0 8px; /* Space between buttons */
        cursor: pointer; /* Pointer on hover */
        font-size: 1.5rem; /* Button font size */
        transition: background-color 0.3s, transform 0.2s; /* Transition effects */
      }

      button:hover {
        background-color: var(--ddd-theme-secondary); /* Change on hover */
      }

      button:focus {
        outline: 2px solid var(--ddd-theme-secondary); /* Outline on focus */
      }

      /* Optional: Responsive button styles */
      @media (max-width: 600px) {
        .number {
          font-size: 2.5rem; /* Adjust font size for smaller screens */
        }
        button {
          font-size: 1rem; /* Adjust button font size for smaller screens */
          padding: 4px 8px; /* Adjust button padding for smaller screens */
        }
      }
    `];
  }

  render() {
    return html`
      <div class="wrapper">
        <div>${this.title}</div>

        <div class="container">
          <button class="decrement" @click="${this._decrementNum}">-</button>
          <div id="counter" class="number">${this.counter}</div>
          <button class="increment" @click="${this._incrementNum}">+</button>
        </div>

        <slot></slot>
      </div>
    `;
  }

  _incrementNum(event) {
    //console.log("increment clicked");
    if (this.counter < this.max-1 && this.counter !==this.min) {
      this.counter++;
    }
    else if (this.counter == this.max-1){
      this.toggleCounterStyle();
      this.counter++;
    }
    else if (this.counter == (this.min)){
      this.toggleCounterStyle();
      this.counter++;
    }
    //console.log(this.counter);
  }

  _decrementNum(event) {
    //console.log("decrement clicked");
    if (this.counter > this.min+1 && this.counter !==this.max) {
      this.counter--;
    }
    else if (this.counter == this.min+1){
      this.counter--;
      this.toggleCounterStyle();
    }
    else if (this.counter == (this.max)){
      this.toggleCounterStyle();
      this.counter--;
    }
    //console.log(this.counter);
    
  }

  toggleCounterStyle() {
    //console.log("in update counter");
    const target = this.shadowRoot.getElementById('counter'); 
    //console.log("target" + target);
    target.classList.toggle('minmax');
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);
