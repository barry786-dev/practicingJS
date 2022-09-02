//const buttons = document.querySelectorAll('button');
const button = document.querySelector('button');

// button.onclick = function() {
//   alert('You clicked me!');
// }

const buttonClickedHAndler = (event) => {
  // event.target.disabled = true;
  console.log(event);
};

const anotherButtonClickedHandler = () => {
  alert('You clicked me again!');
};

// button.onclick = buttonClickedHAndler;
// button.onclick = anotherButtonClickedHandler;

const boundFn = buttonClickedHAndler.bind(this);

// buttons.forEach((button) => {
//   button.addEventListener('click', boundFn);
// });

// setTimeout(() => {
//   button.removeEventListener('click', boundFn);
// },2000);

// window.addEventListener('scroll', (event) => {
//   console.log(event);
// });

/* let curElementNumber = 0;

    function scrollHandler() {
      const distanceToBottom = document.body.getBoundingClientRect().bottom;
console.log(document.documentElement);
      if (distanceToBottom < document.documentElement.clientHeight + 150) {
        const newDataElement = document.createElement('div');
        curElementNumber++;
        newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
        document.body.append(newDataElement);
      }
    }

    window.addEventListener('scroll', scrollHandler); */

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event);
});

// capturing and bubbling
const div = document.querySelector('div');
div.addEventListener('click', (event) => {
  console.log('CLICKED DIV');
  console.log(event);
});
button.addEventListener('click', (event) => {
  event.stopPropagation(); // stop bubbling
  event.stopImmediatePropagation(); // stop bubbling and prevent other listeners from being called
  console.log('CLICKED BUTTON');
  console.log(event);
});

const listItems = document.querySelectorAll('li');
const list = document.querySelector('ul');
/* listItems.forEach((listItem) => {
  listItem.addEventListener('click', (event) => {
    if (event.target.style.textDecoration === 'line-through') {
      event.target.style.textDecoration = 'none';
    } else {
      event.target.style.textDecoration = 'line-through';
    }
  });
}); */
// delegation
list.addEventListener('click', (event) => {
  console.log(event.target); // which element was caused the event
  console.log(event.currentTarget); // which element is listening for the event
  console.log(event.eventPhase); // which phase of the event flow is currently being evaluated
  //event.target.classList.toggle('highlight');
  event.target.closest('li').classList.toggle('highlight');
  //  form.submit(); // submit the form will reload the page because it will ignore the exist event listener
  button.click(); // will trigger the click event listener
});
