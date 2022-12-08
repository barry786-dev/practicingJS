class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
    this.shadowRoot.innerHTML = `
      <style>
      :host([opened]) #backdrop,
      :host([opened]) #modal {
        opacity: 1;
        pointer-events: all;
      }
      :host([opened]) #modal {
        top: 15vh;
      }
      #backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,0.75);
        z-index: 10;
        opacity: 0;
        pointer-events: none;
      }
      #modal {
        position: fixed;
        top: 10vh;
        left: 25%;
        width: 50%;
        z-index: 100;
        background-color: white;
        border-radius: 3px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.26);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease-out;
      }
      header {
        padding: 1rem;
        border-bottom: 1px solid #ccc;
      }
      ::slotted(h1) {
        font-size: 1.25rem;
        margin: 0;
      }
      #main {
        padding: 1rem;
      }
      #actions {
        border-top: 1px solid #ccc;
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
      }
      #actions button {
        margin: 0 0.25rem;
      }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="title">Please Confirm</slot>
        </header>
        <section id='main'>
          <slot></slot>
        </section>
        <section id='actions'>
          <button>Cancel</button>
          <button>Confirm</button>
        </section>
      </div>
    `;
    const slots = this.shadowRoot.querySelectorAll('slot');
    slots[1].addEventListener('slotchange', (event) => {
      //console.dir(slots[1].assignedNodes());
    });
    const backdrop = this.shadowRoot.querySelector('#backdrop');
    const CancelBtn = this.shadowRoot.querySelector('#actions').children[0];
    const ConfirmBtn = this.shadowRoot.querySelector('#actions').children[1];
    backdrop.addEventListener('click', this._cancel.bind(this));
    CancelBtn.addEventListener('click', this._cancel.bind(this));
    ConfirmBtn.addEventListener('click', this._confirm.bind(this));
    // cancelButton.addEventListener('cancel', () => {
    //   console.log('Cancel inside the component');
    // });
  }
  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
  }
  hide() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened');
    }
    this.isOpen = false;
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute('opened')) {
      this.isOpen = true;
      // this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
      // this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
      // this.shadowRoot.querySelector('#modal').style.opacity = 1;
      // this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
    } else {
      this.isOpen = false;
      // this.shadowRoot.querySelector('#backdrop').style.opacity = 0;
      // this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'none';
      // this.shadowRoot.querySelector('#modal').style.opacity = 0;
      // this.shadowRoot.querySelector('#modal').style.pointerEvents = 'none';
    }
  }
  static get observedAttributes() {
    return ['opened'];
  }
  _cancel(event) {
    this.hide();
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }
  _confirm() {
    this.hide();
    const confirmEvent = new Event('confirm');
    this.dispatchEvent(confirmEvent);
  }
}

customElements.define('barry-modal', Modal);
