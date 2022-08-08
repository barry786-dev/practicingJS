/* const ids = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
ids.add(11);
ids.delete(1);
console.log(ids.has(1));

for (const id of ids) {
  console.log(id);
}

for (const id of ids.values()) {
  console.log(id);
}

for (const id of ids.keys()) {
  console.log(id);
}
for (const id of ids.entries()) {
  console.log(id);
} */
/* 
const person1 = { name: 'John', age: 30 };
const person2 = { name: 'Pete', age: 20 };
const person3 = { name: 'Mary', age: 25 };

const personData = new Map([
  [person1, [{ date: 'yesterday', price: 10 }]],
  [person2, 'Pete'],
]);
personData.set(person3, [{ date: 'yesterday', price: 10 }]);
console.log(personData)
console.log(personData.get(person1));

for (const [key, value] of personData.entries()) {
  console.log(key, value);
}

for (const key of personData.keys()) {
  console.log(key);
}
for (const value of personData.values()) {
  console.log(value);
} */

/* let person = {name: 'John', age: 30};
const persons = new WeakSet();
persons.add(person);

//...some operations on the set
// person = null;

const personData = new WeakMap();
personData.set(person, [{ date: 'yesterday', price: 10 }]);

person = null; */
 