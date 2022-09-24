import * as _ from 'lodash/collection';
import { ProjectList } from './App/ProjectList.js';
// const DEFAULT_VALUE = 'Barry'
// window.DEFAULT_VALUE = 'Barry';
globalThis.DEFAULT_VALUE = 'Barry';
// console.log('app.js');
console.log(_.shuffle([1, 2, 3]));
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
