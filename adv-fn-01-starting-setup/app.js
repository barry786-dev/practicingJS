// pure function
function add(a, b) {
  return a + b;
}
console.log(add(1, 2)); // 3
console.log(add(1, 9)); // 10

// impure function
function addRandom(a) {
  return a + Math.random();
}
console.log(addRandom(1)); // 1.123123123 (random number)

// side effect function
let previousResult = 0;
function addMoreNumbers(a, b) {
  const sum = a + b;
  previousResult = sum; // side effect
  return sum;
}

console.log(addMoreNumbers(1, 2)); // 3 if you do not see the function body, you will not know that there is a side effect

// side effect changing object or array that you pass in
const hobbies = ['Sports', 'Cooking'];
function printHobbies(h) {
  h.push('NEW HOBBY'); // side effect
  console.log(h);
}
printHobbies(hobbies); // ['Sports', 'Cooking', 'NEW HOBBY']

let multiplier = 1.1;

// factory function is a function that returns a function
function createTaxCalculator(tax) {
  console.log('line 36', multiplier);
  function calculateTax(amount) {
    console.log('line 38', multiplier);
    return amount * tax * multiplier;
  }
  return calculateTax;
}
const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

multiplier = 1.2; // this will not affect the result of calculateVatAmount

console.log(calculateVatAmount(100)); // 19
console.log(calculateVatAmount(200)); // 38

// closures : every function is a closure
// each function has its own lexical environment and global environment as well

let userName = 'Barry';

function greetUser() {
  let name = 'Anna'; // this is a local variable : shadowing
  console.log('Hi ' + name);
}
let name = 'Abdul';
userName = 'Maker';
greetUser();
