/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
const button = document.querySelector('button');
const textParagraph = document.querySelector('p');
button.addEventListener('click', () => {
  // do something...
  const text = textParagraph.textContent;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  } else {
    console.log('Clipboard API not supported, please use a modern browser, or copy the text manually.');
  }
});
/******/ })()
;
//# sourceMappingURL=app.js.map