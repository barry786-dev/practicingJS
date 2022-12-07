class InfoToggle extends HTMLElement {
  constructor() {
    super();
    /* console.log(this.hasAttribute('is-hidden'));
    this._isHidden = this.getAttribute('is-hidden') === 'true' ? true : false;
    console.log(this._isHidden); */
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        p {
          display: none;
          }
      </style>
      <button>Show</button>
      <p> <slot>Some default</slot> </p>
    `;
    this._toggleBtn = this.shadowRoot.querySelector('button');
    this._toggleBtn.addEventListener('click', this._toggleParagraph.bind(this));
    //this._isHidden = this.getAttribute('is-hidden') === 'true' ? true : false;
  }
  connectedCallback() {
    this._isHidden = this.getAttribute('is-hidden') === 'true' ? true : false;
     if (this._isHidden) {
      this.shadowRoot.querySelector('p').style.display = 'none';
      this._toggleBtn.textContent = 'Show';
    } else {
      this.shadowRoot.querySelector('p').style.display = 'block';
      this._toggleBtn.textContent = 'Hide';
    }
  }
  _toggleParagraph() {
    if (this._isHidden) {
      this.shadowRoot.querySelector('p').style.display = 'block';
      this._toggleBtn.textContent = 'Hide';
    } else {
      this.shadowRoot.querySelector('p').style.display = 'none';
      this._toggleBtn.textContent = 'Show';
    }
    this._isHidden = !this._isHidden;
  }
}
customElements.define('barry-info-toggle', InfoToggle);
