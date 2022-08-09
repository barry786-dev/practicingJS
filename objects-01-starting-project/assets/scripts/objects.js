const person = {
  name: 'John',
  age: 30,
  hobbies: ['music', 'movies', 'sports'],
  greet() {
    console.log('Hi, I am ' + this.name);
  },
};
person.IsMarried = true;
delete person.age;
person.greet();
console.log(person);