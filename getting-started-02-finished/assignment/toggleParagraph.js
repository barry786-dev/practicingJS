import { css } from './style.js';
class ToggleParagraph extends HTMLParagraphElement {
  constructor() {
    super();
    this._styleObject = {
      backgroundColor: 'red',
      color: 'white',
      padding: '0.5rem',
      borderRadius: '0.5rem',
    };
    css(this, this._styleObject);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <button>Show</button>
      <slot>Some default</slot>
    `;
    this._slot = this.shadowRoot.querySelector('slot');
    this._toggleBtn = this.shadowRoot.querySelector('button');
    this._toggleBtn.addEventListener('click', this._toggleParagraph.bind(this));
    this._isHidden = this.getAttribute('is-hidden') === 'true' ? true : false;
    this._slot.hidden = this._isHidden ? true : false;
    this._toggleBtn.textContent = this._isHidden ? 'Show' : 'Hide';
  }
  _toggleParagraph() {
    if (this._isHidden) {
      this._slot.hidden = false;
      this._toggleBtn.textContent = 'Hide';
    } else {
      this._slot.hidden = true;
      this._toggleBtn.textContent = 'Show';
    }
    this._isHidden = !this._isHidden;
  }
}

customElements.define('barry-toggle-paragraph', ToggleParagraph, {
  extends: 'p',
});
