export class DOMHelper {
  static clearEventListeners(element, type) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    clonedElement.textContent = type === 'finished' ? 'active' : 'finished';
    return clonedElement;
  }

  static moveElement(elementId, newDestinationId) {
    const element = document.getElementById(elementId);
    const destination = document.querySelector(newDestinationId);
    destination.append(element);
    //element.replaceWith(element.cloneNode(true));
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export function clearEventListeners(element, type) {
  const clonedElement = element.cloneNode(true);
  element.replaceWith(clonedElement);
  clonedElement.textContent = type === 'finished' ? 'active' : 'finished';
  return clonedElement;
}

export function moveElement(elementId, newDestinationId) {
  const element = document.getElementById(elementId);
  const destination = document.querySelector(newDestinationId);
  destination.append(element);
  //element.replaceWith(element.cloneNode(true));
  element.scrollIntoView({ behavior: 'smooth' });
}
