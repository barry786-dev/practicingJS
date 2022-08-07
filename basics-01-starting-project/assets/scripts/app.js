const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

function getUserNumberInput() {
  return parseInt(userInput.value);
}
function calculateAndWritLog(operator) {
  const enteredNumber = getUserNumberInput();
  if (!enteredNumber) {
    return;
  }
  const initialResult = currentResult;
  const calcDescription = `${initialResult} ${operator} ${enteredNumber}`;
  currentResult = eval(`currentResult ${operator} enteredNumber`);
  outputResult(currentResult, calcDescription);
  const logEntry = {
    operation: operator,
    prevResult: initialResult,
    number: enteredNumber,
    result: currentResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function divide() {
  calculateAndWritLog('/');
}
/**
 *
 * @param {number} a
 * @param {number} b
 * @returns the sum of a and b
 */
function add() {
  calculateAndWritLog('+');
}

function subtract() {
  calculateAndWritLog('-');
}

function multiply() {
  calculateAndWritLog('*');
}
addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
