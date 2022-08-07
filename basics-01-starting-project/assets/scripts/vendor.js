const userInput = document.getElementById('input-number');
const addBtn = document.getElementById('btn-add');
const subtractBtn = document.getElementById('btn-subtract');
const multiplyBtn = document.getElementById('btn-multiply');
const divideBtn = document.getElementById('btn-divide');

const currentResultOutput = document.getElementById('current-result');
const currentCalculationOutput = document.getElementById('current-calculation');
function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.textContent = text;
}
/* let calculation = [];
userInput.addEventListener('input', function (event) {
  calculation.push(event.target.value);
  if (calculation.length === 1 && calculation[0] !== '') {
    outputResult('', event.target.value);
  } else if (calculation.length === 3 && calculation[0] !== undefined) {
    outputResult(
      eval(`${calculation[0]} ${calculation[1]} ${calculation[2]}`),
      `${calculation[0]} ${calculation[1]} ${calculation[2]}`
    );
    calculation = [];
  }
});

addBtn.addEventListener('click', function () {
  if (calculation.length > 0) {
    calculation[1] = '+';
    outputResult('', calculation.join(''));
  }
}); */
