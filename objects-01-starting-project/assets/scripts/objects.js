/* const movieList = document.querySelector('#movie-list');
movieList.style['background-color'] = 'red';
movieList.style.display = 'block'; */

const person = {
  'first-name': 'John',
  age: 30,
  hobbies: ['music', 'movies', 'sports'],
  greet() {
    console.log('Hi, I am ' + this.name);
  },
};
person['first-name'] = 'Mike';
person.IsMarried = true;
delete person.age;
person.greet();
console.log(person);
