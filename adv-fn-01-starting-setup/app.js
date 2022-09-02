// pure function
function add(a, b) {
  return a + b;
}
console.log(add(1, 2));// 3
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
