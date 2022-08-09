/* const movieList = document.querySelector('#movie-list');
movieList.style['background-color'] = 'red';
movieList.style.display = 'block'; */

const userChosenKeyName = 'user-chosen';
const person = {
  'first-name': 'John',
  age: 30,
  hobbies: ['music', 'movies', 'sports'],
  [userChosenKeyName]: 'user-chosen-value',
  greet() {
    console.log('Hi, I am ' + this.name);
  },
  1: 'a',
};
person['first-name'] = 'Mike';
person.IsMarried = true;
delete person.age;
person.greet();
console.log(person);
console.log(person[1]);
// if you use only numbers as keys for object then they orders wil be automatically sorted and that make you understand the array as a object
