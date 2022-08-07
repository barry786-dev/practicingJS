const StartAddMovieBtn = document.querySelector('#header_layout button');
//const StartAddMovieBtn = document.querySelector('#header').lastElementChild;
const addMovieModel = document.querySelector('#add-modal');
//const addMovieModel = document.body.children[1];
const deleteMovieModel = document.querySelector('#delete-modal');
const backDrop = document.querySelector('#backdrop');
const cancelMovieDeleteBtn = deleteMovieModel.querySelector('.btn--passive');
const cancelAddMovieBtn = addMovieModel.querySelector('.btn--passive');
const confirmAddMovieBtn = addMovieModel.querySelector('.btn--success');
//const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModel.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const moviesList = document.querySelector('#movie-list');

let  MoviesData = [];
const clearMovieInputs = () => {
  for (let i = 0; i < userInputs.length; i++) {
    userInputs[i].value = '';
  }
  /* for (const input of userInputs) {
    input.value = '';
  } */
  /* userInputs.forEach((input) => {
    input.value = '';
  }); */
};
const ToggleBackDrop = () => {
  backDrop.classList.toggle('visible');
};

const toggleMovieAddModel = () => {
  clearMovieInputs();
  addMovieModel.classList.toggle('visible');
  ToggleBackDrop();
};
const toggleDeleteMovieModel = () => {
  deleteMovieModel.classList.toggle('visible');
  ToggleBackDrop();
};
const backDropClickHandler = () => {
  if (addMovieModel.classList.contains('visible')) {
    toggleMovieAddModel();
  }
  if (deleteMovieModel.classList.contains('visible')) {
    toggleDeleteMovieModel();
  }
};

const addMovieHandler = () => {
  let movie = {};
  movie.Id = Date.now();
  userInputs.forEach((input) => {
    movie[input.name] = input.value.trim();
  });
  if (
    movie.title === '' ||
    movie.image_url === '' ||
    movie.rating === '' ||
    +movie.rating < 1 ||
    +movie.rating > 5
  ) {
    alert('Please enter valid movie details');
    return;
  }
  MoviesData.push(movie);
  toggleMovieAddModel();
  updateMovieList();
};

const updateMovieList = () => {
  if (MoviesData.length === 0) {
    entryTextSection.style.display = 'block';
    return;
  } else {
    entryTextSection.style.display = 'none';
    const MovieNewLi = document.createElement('li');
    MovieNewLi.className = 'movie-element';
    const MovieLiImgDiv = document.createElement('div');
    MovieLiImgDiv.className = 'movie-element__image';
    const MovieLiInfo = document.createElement('div');
    MovieLiInfo.className = 'movie-element__info';
    const MovieLiTitle = document.createElement('h2');
    const MovieLiImg = document.createElement('img');
    const MovieLiRating = document.createElement('p');
    MovieLiTitle.textContent = MoviesData[MoviesData.length - 1].title;
    MovieLiImg.src = MoviesData[MoviesData.length - 1].image_url;
    MovieLiImg.alt = MoviesData[MoviesData.length - 1].title;
    MovieLiRating.textContent =
      MoviesData[MoviesData.length - 1].rating + '/5 stars';

    MovieLiImgDiv.append(MovieLiImg);
    MovieLiInfo.append(MovieLiTitle, MovieLiRating);
    MovieNewLi.append(MovieLiImgDiv, MovieLiInfo);
    moviesList.append(MovieNewLi);
    const MovieIndex =MoviesData[MoviesData.length - 1].Id;
    MovieNewLi.addEventListener('click', () => {
      toggleDeleteMovieModel();
      const deleteMovieListBtn = document.querySelector(
        '#delete-modal .btn--danger'
      );
      deleteMovieListBtn.addEventListener('click', function removeList() {
        toggleDeleteMovieModel();
        MoviesData = MoviesData.filter((movie) => movie.Id !== MovieIndex);
        //MoviesData.splice(MovieIndex, 1);
        MovieNewLi.remove();
        /* deleteMovieModel.classList.remove('visible');
        backDrop.classList.remove('visible'); */
        deleteMovieListBtn.removeEventListener('click', removeList);
        if (MoviesData.length === 0) {
          entryTextSection.style.display = 'block';
        }
      });
    });
  }
};

StartAddMovieBtn.addEventListener('click', toggleMovieAddModel);
backDrop.addEventListener('click', backDropClickHandler);
cancelMovieDeleteBtn.addEventListener('click', toggleDeleteMovieModel);
cancelAddMovieBtn.addEventListener('click', toggleMovieAddModel);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
