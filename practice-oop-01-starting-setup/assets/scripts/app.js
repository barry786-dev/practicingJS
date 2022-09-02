class DOMHelper {
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

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach = () => {
    if (this.element) {
      this.element.remove();
      //this.element.parentElement.removeChild(this.element);
    }
  };
  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(deactivateTooltipFn, tooltipText, hostElementId) {
    super(hostElementId);
    this.tooltipText = tooltipText;
    this.deactivateTooltip = deactivateTooltipFn;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.deactivateTooltip();
  };

  create = () => {
    const tooltip = document.createElement('div');
    tooltip.className = 'card';
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.tooltipText;
    tooltip.append(tooltipBody);
    //tooltip.textContent = this.tooltipText;
    // console.log(this.hostElement.getBoundingClientRect().left);
    // console.log(this.hostElement.offsetLeft);
    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;

    const hostElementParent = this.hostElement.parentElement;

    let parentElementScrolling = hostElementParent.scrollTop;
    const parentElementHeight = hostElementParent.clientHeight;
    const parentElementTop = hostElementParent.offsetTop;
    const x = hostElPosLeft + 20;
    let y = hostElPosTop + hostElHeight - parentElementScrolling - 20;

    tooltip.style.position = 'absolute';
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';

    this.hostElement.parentElement.addEventListener('scroll', () => {
      parentElementScrolling = hostElementParent.scrollTop;
      y = hostElPosTop + hostElHeight - parentElementScrolling - 20;
      if (y > parentElementHeight + parentElementTop) {
        tooltip.style.display = 'none';
      } else {
        tooltip.style.display = 'block';
        tooltip.style.top = y + 'px';
      }
    });

    tooltip.addEventListener('click', this.closeTooltip);
    this.element = tooltip;
  };
}

class ProjectItem {
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
      const tooltip = new Tooltip(
        this.deactivateTooltip.bind(this),
        tooltipText,
        this.id
      );
      tooltip.attach();
      this.hasActiveTooltip = true;
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
    /* MoreInfo.addEventListener('mouseover', () => {
      projectItemElement.title = projectItemElement['dataset'].extraInfo;
    });
    MoreInfo.addEventListener('mouseleave', () => {
      projectItemElement.title = '';
    }); */
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
    //switchButton.onclick = null;
    /* if (switchButton.getAttribute('listener') !== 'true') {
      switchButton.addEventListener(
        'click',
        this.switchProjectHandler.bind(null, this.id)
      );
      switchButton.setAttribute('listener', 'true');
    } else {
      switchButton.replaceWith(switchButton.cloneNode(true));
      switchButton = projectItemElement.querySelector(
        'button:last-of-type'
      );
      switchButton.addEventListener(
        'click',
        this.switchProjectHandler.bind(null, this.id)
      );
    } */
  }
  update(updateProjectListsFn, type) {
    this.switchProjectHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    //this.switchHandler = switchHandlerFunction;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    //console.log(prjItems);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
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
    /* this.projects.push(
      new ProjectItem(project.id, this.switchProject.bind(this))
    ); */
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(id) {
    // const projectIndex = this.projects.findIndex(prj => prj.id === id);
    // this.projects.splice(projectIndex, 1);
    /* const copy = this.projects.slice();
    this.projects = this.projects.filter((prj) => prj.id !== id);
    this.switchHandler(
      copy.find((prj) => prj.id === id),
      this.type
    ); 2*/
    /* if (this.type === 'active') {
      App.finishedProjectsList.addProject(id);} else {
      App.activeProjectsList.addProject(id);
    }
    console.log(App.activeProjectsList.projects);
    console.log(App.finishedProjectsList.projects); 3*/
    this.switchHandler(this.projects.find((prj) => prj.id === id)); //addProject(project);
    this.projects = this.projects.filter((prj) => prj.id !== id);
  }
}
let stopIntervalId;
class App {
  static init() {
    const activeProjectsList = new ProjectList(
      'active'
      //2 this.switchHandlerFunction
    );
    const finishedProjectsList = new ProjectList(
      'finished'
      //2 this.switchHandlerFunction
    );
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
    // const timerId = setTimeout(() => {
    //   this.startAnalytics();
    // }, 3000);
    document
      .querySelector('#start-analytics-btn')
      .addEventListener('click', () => {
        console.log(timerId);
        clearTimeout(timerId);
        if (stopIntervalId) {
          clearInterval(stopIntervalId);
        }
      });

    /* const someScript = document.createElement('script');
    someScript.textContent = 'alert("Hi there!")';
    document.head.append(someScript); */
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }

  /*  static switchHandlerFunction(project, type) {
    console.log(project);
    if (type === 'active') {
      App.finishedProjectsList.addProject(project.id);
    } else {
      App.activeProjectsList.addProject(project.id);
    }
    console.log(App.activeProjectsList.projects);
    console.log(App.finishedProjectsList.projects);
  } 2*/
}

App.init();
