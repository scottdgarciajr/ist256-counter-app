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
    this.min = 10;
    this.num = 5;
  }

  static get properties() {
    return {
      title: { type: String },
      min: { type: Number },
      max: { type: Number },
      num: { type: Number }

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
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
    `];
  }

  render() {
    return html`
<div class="wrapper">
  <div>${this.title}</div>
  

  <div class = "container">
    <button>+</button>
    <div>${this.num}</div>
    <button>-</button>
  </div>

  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }

  _incrementNum(event) {
    if (this.num < (this.max)) {
      this.num++;
    }
  }
  _decrementNum(event) {
    if (this.num > (this.min)) {
      this.num++;
    }
  }



}



globalThis.customElements.define(counterApp.tag, counterApp);