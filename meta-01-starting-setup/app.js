// Library land
const uid = Symbol('barry');
console.log('uid:', uid);

const user = {
  // id: 'p1',
  [uid]: 'p1',
  name: 'max',
  age: 30,
  [Symbol.toStringTag]: 'User',
};

// app land => using the library
user.id = 'p2'; // this should not be possible
user[Symbol('barry')] = 10;
console.log(user);
console.log(Symbol('hallo') === Symbol('hallo'));
user[uid] = '200';
console.log(user);
console.log(user.toString());

// Iterators & Generators

/* const company = {
  curEmployee: 0,
  employees: ['Max', 'Manu', 'Anna'],
  next() {
    const returnValue = { value: this.employees[this.curEmployee], done: false };
    this.curEmployee++;
    return returnValue;
  },
}; */

const company = {
  curEmployee: 0,
  employees: ['Max', 'Manu', 'Anna'],
  next() {
    // this is a next() generator function
    return {
      value: this.employees[this.curEmployee++],
      done: this.curEmployee > this.employees.length,
    };
  },
  getEmployee: function* employeeGenerator() {
    // this is a generator function* yield using an object key
    let currentEmployee = 0;
    while (currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee++];
    }
  },
  [Symbol.iterator]: function* employeeGenerator() {
    // this is a generator function* yield using a symbol
    let currentEmployee = 0;
    while (currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee++];
    }
  },
};

/* console.log(company.next());
console.log(company.next());
console.log(company.next());
console.log(company.next());
console.log(company.next()); */

let employee = company.next();

while (!employee.done) {
  console.log(employee.value);
  employee = company.next();
}

const it = company.getEmployee();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

for (const employee of company) {
  console.log(employee);
}

console.log([...company]);

const persons = ['Max', 'Manu'];

// ---- reflect API ----

const course = {
  title: 'JavaScript - The Complete Guide',
  rating: 5,
};

Reflect.setPrototypeOf(course, {
  toString() {
    return this.title;
  },
});
console.log(course.toString());

Reflect.defineProperty(course, 'price', {
  writable: true,
  enumerable: true,
  value: 9.99,
});
console.log(course.price);
Reflect.deleteProperty(course, 'rating');

// ---- Proxy API ----
