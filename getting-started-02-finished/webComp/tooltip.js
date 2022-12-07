import { css } from './style.js';
class Tooltip extends HTMLElement {
  constructor() {
    super();
    /* this._tooltipIcon = document.createElement('span');
    this._tooltipIcon.textContent = `(?)${this.innerText}`; */
    this._tooltipContainer;
    this._tooltipText = '...No hint text found...';
    this._styleObject = {
      position: 'relative',
    };
    this._tooltipContainer_styleObject = {
      backgroundColor: 'black',
      color: '#fff',
      position: 'absolute',
      zIndex: '10',
      top: '2.5rem',
      left: '1.75rem',
      borderRadius: '3px',
      padding: '0.15rem 0.5rem',
      boxShadow: '1px 1px 6px rgba(0,0,0,0.26)',
      fontSize: '1.20rem',
      fontWeight: 'normal',
      width: '70px',
      textAlign: 'center',
    };
    this.attachShadow({ mode: 'open' });
    /* const template = document.getElementById('tooltip-template');
    this.shadowRoot.appendChild(template.content.cloneNode(true)); */
    this.shadowRoot.innerHTML = `
      <style>
      span {
        background-color: black;
        color: white;
        border-radius: 50%;
        padding: 0.3rem 0.5rem;
        font-size: 0.75rem;
        text-align: center;
      }
      ::slotted(span) { /* style the tooltip slots conditionally*/
        text-decoration: underline dotted;
      }
      :host(.important) ::slotted(span) { /* style conditionally the tooltip if it has a class*/
        background-color: var(--color-primary, #ccc);
      }
      :host-context(p){ /* style conditionally the tooltip if it is a child of a p tag*/
        font-weight: bold;
      }
      </style>
      <slot>Some default</slot>
      <span>?</span>
    `;
    this._tooltipIcon = this.shadowRoot.querySelector('span');
  }
  connectedCallback() {
    if (this.hasAttribute('message') && this.getAttribute('message') !== '') {
      this._tooltipText = this.getAttribute('message');
    }
    // this.shadowRoot.appendChild(this._tooltipIcon);
    this._tooltipIcon.addEventListener(
      'mouseenter',
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      'mouseleave',
      this._hideTooltip.bind(this)
    );
    css(this, this._styleObject);
  }
  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    css(this._tooltipContainer, this._tooltipContainer_styleObject);

    this.shadowRoot.appendChild(this._tooltipContainer);
  }
  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define('barry-tooltip', Tooltip);
