import { DOMHelper } from '../Utility/DOMHelper.js';
// import { Tooltip } from './Tooltip.js';

export class ProjectItem {
  hasActiveTooltip = false;
  constructor(id, switchProjectFunction, type) {
    this.id = id;
    this.switchProjectHandler = switchProjectFunction;
    this.type = type;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
    this.connectDrag();
  }
  showMoreInfoHandler() {
    if (!this.hasActiveTooltip) {
      const tooltipText = document.getElementById(this.id).dataset.extraInfo;
      import('./Tooltip.js').then((module) => {
        const tooltip = new module.Tooltip(
          this.deactivateTooltip.bind(this),
          tooltipText,
          this.id
        );
        tooltip.attach();
        this.hasActiveTooltip = true;
      });
    }
  }

  deactivateTooltip() {
    this.hasActiveTooltip = false;
  }

  connectDrag() {
    const projectItemElement = document.querySelector(`#${this.id}`);
    const list = document.querySelector(`#${this.type}-projects ul`);
    projectItemElement.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });
    projectItemElement.addEventListener('dragend', (event) => {
      list.parentElement.classList.remove('droppable');
      if (event.dataTransfer.dropEffect === 'move') {
        console.log('dropped');
      } else {
        console.log('canceled');
      }
    });
  }

  connectMoreInfoButton() {
    const projectItemElement = document.querySelector(`#${this.id}`);
    const MoreInfo = projectItemElement.querySelector(`.alt`);
    MoreInfo.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }
  connectSwitchButton(type) {
    const projectItemElement = document.querySelector(`#${this.id}`);
    let switchButton = projectItemElement.querySelector('button:last-of-type');
    switchButton = DOMHelper.clearEventListeners(switchButton, type);
    //switchButton.replaceWith(switchButton.cloneNode(true));
    //switchButton = projectItemElement.querySelector('button:last-of-type');
    switchButton.addEventListener(
      'click',
      this.switchProjectHandler.bind(null, this.id)
    );
  }
  update(updateProjectListsFn, type) {
    this.switchProjectHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}
