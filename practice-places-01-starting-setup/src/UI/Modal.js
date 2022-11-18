export class Modal {
  constructor(contentId, fallbackText, messageArray) {
    this.messageArray = messageArray || [];
    this.fallbackText = fallbackText || 'Loading...';
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById('modal-template');
  }
  show() {
    if ('content' in document.createElement('template')) {
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      this.modalElement = modalElements.querySelector('.modal');
      this.backdropElement = modalElements.querySelector('.backdrop');
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );
      if (this.messageArray.length) {
        this.modalElement.addEventListener('click', this.hide.bind(this));
        const h1 = contentElement.querySelector('h1');
        const p = contentElement.querySelector('p');
        h1.innerHTML = this.messageArray[0];
        p.innerHTML = this.messageArray[1];
      }
      this.modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement('afterbegin', this.modalElement);
      document.body.insertAdjacentElement('afterbegin', this.backdropElement);
    } else {
      alert(this.fallbackText);
    }
  }
  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement); // this.modalElement.remove();
      document.body.removeChild(this.backdropElement);
      this.modalElement = null; //clean up from memory
      this.backdropElement = null;
      this.messageArray = [];
    }
  }
}
