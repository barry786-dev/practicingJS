// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
const button = document.querySelector('button');
const textParagraph = document.querySelector('p');
button.addEventListener('click', () => {
  // do something...
  const text = textParagraph.textContent;
  const promise = new Promise( (resolve) => {
    setTimeout(() => {
      resolve('This is the resolved data!');
    }, 2000);
  });
  console.log(promise);
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log(
      'Clipboard API not supported, please use a modern browser, or copy the text manually.'
    );
  }
});
