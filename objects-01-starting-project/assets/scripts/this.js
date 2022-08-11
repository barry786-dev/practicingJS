'use strict';
console.log(this); // this will referer  this file module object or window object in browser

function testThis() {
  console.log(this); // this wil refer to global or window object in browser or undefined in strict mode
}
//testThis();
const testArrowThis = () => {
  console.log(this); // this wil refer to this file module object or window object in browser
};
//testArrowThis();

const test = {
  testThis: function () {
    console.log(this); // this wil refer to the test object
  },
};
//test.testThis();
const testArrow = {
  testArrowThis: () => {
    console.log(this); // this will refer to this file module object or window object in browser
  },
};
//testArrow.testArrowThis();
const testFunc2 = {
  testFunc2() {
    console.log(this); // this wil refer to the testFunc2 object
  },
};
//testFunc2.testFunc2();

const testMethodCopy = test.testThis;
// testMethodCopy(); // this wil refer to global or window object in browser or undefined in strict mode
//testMethodCopy.call(test); // this wil refer to the test object
//testMethodCopy.apply(test); // this wil refer to the test object
//testMethodCopy.bind(test)(); // this wil refer to the test object

// if we call a function (not arrow function) with this keyword then it will refer to the object that is calling the function either then the global object or window object in browser or the event listener event who trigger the function as example the DOM button object , if we use arrow function then it will refer to the global or window object in browser does which object is calling the function, that means arrow function will not have this keyword
//const testThisBtn = document.querySelector('#test_this');
//testThisBtn.addEventListener('click', testThis); // this wil refer to the testThisBtn object
//testThisBtn.addEventListener('click', testArrowThis); // this wil refer to the window object in browser

/* const members = {
  teamName: 'Super Team',
  teamMembers: ['John', 'Jane', 'Mark'],
  getTeamMembers: function () {
    this.teamMembers.forEach((member) => {
      console.log(this.teamName + ' ' + member);
    });
  }
} */ // this will refer to the members object so no error will be thrown

/* const members = {
  teamName: 'Super Team',
  teamMembers: ['John', 'Jane', 'Mark'],
  getTeamMembers () {
    this.teamMembers.forEach(function (member) {
      console.log(this.teamName + ' ' + member);
    });
  },
}; */ // this.teamMembers will refer to member object but this.teamName will not find any thing to bind the this keyword so it will bind it to the global object or window object in browser so the error will be thrown(this.teamName is not defined)
// members.getTeamMembers();

/* const person = {
  name: 'Max',
  greet() {
    console.log(this); // ???
    console.log(this.name);
  },
};

const { greet } = person;
greet(); */

/* "this" - Summary
The this keyword can lead to some headaches in JavaScript - this summary hopefully acts as a remedy.

this refers to different things, depending on where it's used and how (if used in a function) a function is called.

Generally, this refers to the "thing" which called a function (if used inside of a function). That can be the global context, an object or some bound data/ object (e.g. when the browser binds this to the button that triggered a click event).

1) this in Global Context (i.e. outside of any function)

function something() { ... }
 
console.log(this); // logs global object (window in browser) - ALWAYS (also in strict mode)!
2) this in a Function (non-Arrow) - Called in the global context

function something() { 
    console.log(this);
}
 
something(); // logs global object (window in browser) in non-strict mode, undefined in strict mode
3) this in an Arrow-Function - Called in the global context

const something = () => { 
    console.log(this);
}
 
something(); // logs global object (window in browser) - ALWAYS (also in strict mode)!
4) this in a Method (non-Arrow) - Called on an object

const person = { 
    name: 'Max',
    greet: function() { // or use method shorthand: greet() { ... }
        console.log(this.name);
    }
};
 
person.greet(); // logs 'Max', "this" refers to the person object
5) this in a Method (Arrow Function) - Called on an object

const person = { 
    name: 'Max',
    greet: () => {
        console.log(this.name);
    }
};
 
person.greet(); // logs nothing (or some global name on window object), "this" refers to global (window) object, even in strict mode
this can refer to unexpected things if you call it on some other object, e.g.:

const person = { 
    name: 'Max',
    greet() {
        console.log(this.name);
    }
};
 
const anotherPerson = { name: 'Manuel' }; // does NOT have a built-in greet method!
 
anotherPerson.sayHi = person.greet; // greet is NOT called here, it's just assigned to a new property/ method on the "anotherPerson" object
 
anotherPerson.sayHi(); // logs 'Manuel' because method is called on "anotherPerson" object => "this" refers to the "thing" which called it
If in doubt, a console.log(this); can always help you find out what this is referring to at the moment! */
