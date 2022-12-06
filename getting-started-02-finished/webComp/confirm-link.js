class ConfirmLink extends HTMLAnchorElement {
  constructor() {
    super();
    this.addEventListener('click', this._onClick.bind(this));
  }

  _onClick(event) {
    if (!confirm('Are you sure?')) {
      event.preventDefault();
    }
  }
}

customElements.define('barry-confirm-link', ConfirmLink, { extends: 'a' });