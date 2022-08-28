class Tooltip {}

class ProjectItem {
  constructor(id, switchProjectFunction) {
    this.id = id;
    this.switchProjectFunction = switchProjectFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton();
  }
  connectMoreInfoButton() {
    const li = document.querySelector(`#${this.id}`);
    const MoreInfo = document.querySelector(`#${this.id} .alt`);
    MoreInfo.addEventListener('mouseover', () => {
      li.title = li['dataset'].extraInfo;
    });
    MoreInfo.addEventListener('mouseleave', () => {
      li.title = '';
    });
  }
  connectSwitchButton() {
    const projectItemElement = document.querySelector(`#${this.id}`);
    const switchButton = projectItemElement.querySelector(
      'button:last-of-type'
    );
    switchButton.addEventListener(
      'click',
      this.switchProjectFunction.bind(null, this.id)
    );
  }
}

class ProjectList {
  projects = [];
  constructor(type, switchHandlerFunction) {
    this.type = type;
    this.switchHandler = switchHandlerFunction;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    //console.log(prjItems);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this))
      );
    }
  }

  addProject(id) {
    this.projects.push(new ProjectItem(id, this.switchProject.bind(this)));
  }

  switchProject(id) {
    // const projectIndex = this.projects.findIndex(prj => prj.id === id);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(
      copy.find((prj) => prj.id === id),
      this.type
    );
    this.projects = this.projects.filter((prj) => prj.id !== id);
    /*  if (this.type === 'active') {
      App.finishedProjectsList.addProject(id);} else {
      App.activeProjectsList.addProject(id);
    } */
  }
}

class App {
  static init() {
    this.activeProjectsList = new ProjectList(
      'active',
      this.switchHandlerFunction
    );
    this.finishedProjectsList = new ProjectList(
      'finished',
      this.switchHandlerFunction
    );
  }

  static switchHandlerFunction(project, type) {
    console.log(project);
    if (type === 'active') {
      App.finishedProjectsList.addProject(project.id);
    } else {
      App.activeProjectsList.addProject(project.id);
    }
  }
}

App.init();
