import { ProjectList } from './App/ProjectList.js';

// const DEFAULT_VALUE = 'Barry'
// window.DEFAULT_VALUE = 'Barry';
globalThis.DEFAULT_VALUE = 'Barry';

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
  }
}

App.init();
