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
        padding: 16px; 
        border-radius: 8px; 
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
      }

      :host([counter="21"]) #counter {
        color: salmon; 
      }

      :host([counter="18"]) #counter {
        color: yellow; 
      }

      .minmax {
        color: red;
      }

      .wrapper {
        text-align: center; 
      }

      .container {
        display: flex;
        justify-content: center; 
        align-items: center;
        margin-top: 16px; 
      }

      .number {
        font-size: 4rem; 
        margin: 0 16px; 
        font-weight: bold; 
      }

      button {
        background-color: var(--ddd-theme-primary);
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px; 
        margin: 0 8px; 
        cursor: pointer;
        font-size: 1.5rem; 
        transition: background-color 0.3s, transform 0.2s; 
      }

      button:hover {
        background-color: var(--ddd-theme-secondary);
        color: green; 
      }

      button:focus {
        outline: 2px solid var(--ddd-theme-secondary); 
      }

      
      @media (max-width: 600px) {
        .number {
          font-size: 2.5rem; 
        }
        button {
          font-size: 1rem; 
          padding: 4px 8px; 
        }
      }
    `];
  }

  render() {
    return html`
    <confetti-container id="confetti">
      <div class="wrapper">
        <div>${this.title}</div>

        <div class="container">
          <button class="decrement" @click="${this._decrementNum}">-</button>
          <div id="counter" class="number">${this.counter}</div>
          <button class="increment" @click="${this._incrementNum}">+</button>
        </div>

        <slot></slot>
      </div>
    </confetti-container>
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
      const incrementButton = this.shadowRoot.querySelector('.increment');//unecessary, but added to meet homework requirements
      //incrementButton.disabled = true;//unecessary, but added to meet homework requirements
    }
    else if (this.counter == (this.min)){
      this.toggleCounterStyle();
      this.counter++;
      const incrementButton = this.shadowRoot.querySelector('.increment');//unecessary, but added to meet homework requirements
      //incrementButton.disabled = false;//unecessary, but added to meet homework requirements
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
      const decrementButton = this.shadowRoot.querySelector('.decrement');
      //decrementButton.disabled = true;
    }
    else if (this.counter == (this.max)){
      this.toggleCounterStyle();
      this.counter--;
      const decrementButton = this.shadowRoot.querySelector('.decrement');
      //decrementButton.disabled = false;
    }
    //console.log(this.counter);
    
  }

  toggleCounterStyle() {
    //console.log("in update counter");
    const target = this.shadowRoot.getElementById('counter'); 
    //console.log("target" + target);
    target.classList.toggle('minmax');
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      if (this.counter==21){this.makeItRain();}
    }
  }
  
  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }



}

globalThis.customElements.define(counterApp.tag, counterApp);
