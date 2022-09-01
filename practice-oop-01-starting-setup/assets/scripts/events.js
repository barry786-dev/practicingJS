const buttons = document.querySelectorAll('button');

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

buttons.forEach((button) => {
  button.addEventListener('click', boundFn);
});

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

  
