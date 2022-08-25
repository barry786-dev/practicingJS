/* class AgedPerson {
  printAge() {
    console.log(this.age);
  }
}
class Person extends AgedPerson {
  name = 'Barry';
  constructor (age) {
    super();
    this.age = age;
  }
  greet() {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`);
  }
} */
/* function Person(age) {
  this.age = age;
  this.name = 'Barry';
  this.greet = function () {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`);
  };
} */
/* Person.prototype = {
  printAge() {
    console.log(this.age);
  },
}; */
/* Person.prototype.printAge = function () {
  console.log(this.age);
};

console.dir(Person);
const person = new Person(30);
person.greet();
person.printAge();
console.log(person.__proto__);
const p = new person.__proto__.constructor(40);
console.log(p); */

/* console.dir(Person);
console.dir(Person.prototype);
console.log(Person.__proto__); */

//console.log(Person.[[Prototype]]);
/* const person = new Person(40);
console.log(person);
console.log(person.prototype);
console.log(person.__proto__ === Person.prototype);
person.greet();
person.printAge();

console.log(Object.getOwnPropertyNames(person)); */

// Language: javascript
/* const person1 = {
  name: 'Barry',
  age: 40,
}
console.dir(person1.__proto__);
console.log(person1.toString());

person1.sayHello(); */

const course = {
  title: 'JavaScript',
  price: 30,
};

Object.setPrototypeOf(course, {
  // ...Object.getPrototypeOf(course),
  printPrice() {
    console.log(this.price);
  },
});

const student = Object.create(
  {
    printProgress: function () {
      console.log(this.name);
    },
  },
  {
    name: {
      value: 'Barry',
    },
    points: {
      value: 10,
      enumerable: true,
      writable: true,
      configurable: true,
    },
  }
);
//student.name = 'Barry';
student.printProgress();
/* Object.defineProperty(student, 'points', {
  value: 10,
  enumerable: true,
  writable: true,
  configurable: true,
}); */
console.log(student.points);
//course.printPrice();
