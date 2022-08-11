/* const movieList = document.querySelector('#movie-list');
movieList.style['background-color'] = 'red';
movieList.style.display = 'block'; */

/* const userChosenKeyName = 'user-chosen';
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
console.log(person[1]); */
// if you use only numbers as keys for object then they orders wil be automatically sorted and that make you understand the array as a object

const addMovieBtn = document.querySelector('#add-movie-btn');
const searchBtn = document.querySelector('#search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.querySelector('#movie-list');
  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';
  const filteredMovies =
    filter === ''
      ? movies
      : movies.filter((movie) => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    //movieEl.classList.add('list-item');
    //movieEl.textContent = movie.info.title + ' __ ' + movie.info[extraName];
    /* if ('info' in movie){

    } */
    const { info: movieInfo, ...otherProps } = movie;
    console.log(otherProps);
    let { getFormattedTitle } = movie;
    //getFormattedTitle = getFormattedTitle.bind(movie); // you can excite it directly if you by using call or apply
    let text = getFormattedTitle.call(movie) + ' __ ';
    for (const key in movieInfo) {
      if (key !== 'title' && key !== '_title') {
        text += key + ' : ' + movieInfo[key];
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.querySelector('#title').value.trim();
  const extraName = document.querySelector('#extra-name').value.trim();
  const extraValue = document.querySelector('#extra-value').value.trim();
  if ( extraName === '' || extraValue === '') {
    return;
  }
  const newMovie = {
    info: {
      set title(value) {
        if (value.trim() === '') {
          this._title = 'Unknown';
          return;
        }
        this._title = value;
      },
      get title() {
        return this._title.toUpperCase();
      },
      [extraName]: extraValue,
    },
    id: Date.now().toString(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };
  newMovie.info.title = title;
  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const FilteredTitle = document.getElementById('filter-title').value.trim();
  renderMovies(FilteredTitle);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
