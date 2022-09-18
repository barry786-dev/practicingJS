import { ProjectItem as PrjItem } from './ProjectItem.js';
import * as DOMh from '../Utility/DOMHelper.js';
const ProjectItem = 'abc'
export class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    //this.switchHandler = switchHandlerFunction;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    //console.log(prjItems);
    for (const prjItem of prjItems) {
      this.projects.push(
        new PrjItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    this.connectDroppable();
  }
  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);
    list.addEventListener('dragenter', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        list.parentElement.classList.add('droppable');
        event.preventDefault();
      }
    });
    list.addEventListener('dragover', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
      }
    });
    list.addEventListener('dragleave', (event) => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove('droppable');
      }
    });
    list.addEventListener('drop', (event) => {
      event.preventDefault(); // add it because of firefox
      const prjId = event.dataTransfer.getData('text/plain');
      if (this.projects.find((p) => p.id === prjId)) {
        return;
      }
      document
        .getElementById(prjId)
        .querySelector('button:last-of-type')
        .click();
      list.parentElement.classList.remove('droppable');
    });
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    // DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    DOMh.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(id) {
    this.switchHandler(this.projects.find((prj) => prj.id === id)); //addProject(project);
    this.projects = this.projects.filter((prj) => prj.id !== id);
  }
}
