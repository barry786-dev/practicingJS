/* const numbers = [1, 2, 3, 4, 5];
console.log(numbers);

const moreNumbers = new Array();
console.log(moreNumbers);

const moreNumbers2 = new Array('Hi',1, 2, 3, 4, 5);
console.log(moreNumbers2);

const moreNumbers3 = new Array(1, 2, 3, 4, 5);
console.log(moreNumbers3);

const moreNumbers4 = new Array(2);
console.log(moreNumbers4);

const moreNumbers5 = Array.of(2, 3, 4, 5);
console.log(moreNumbers5);
const str = 'love';
const moreNumbers6 = Array.from(str);
console.log(moreNumbers6);
const moreNumbers7 = Array.from('love', (char) => char.toUpperCase());
console.log(moreNumbers7);
const moreNumbers8 = Array.from({length: 5});
console.log(moreNumbers8);
const moreNumbers9 = Array.from({length: 5}, (v, k) => k);
console.log(moreNumbers9);
const moreNumbers10 = Array.from(numbers);
moreNumbers10.push(6);
console.log(moreNumbers10);
console.log(numbers)

const listItems = document.querySelectorAll('li');
console.log(listItems);
const ArrayListItems = Array.from(listItems);
console.log(ArrayListItems);
 */
/* const numbers11 = [1, 2, 3, 4, 5];
numbers11.push('6');
numbers11.unshift(0);
const str = numbers11.pop();
numbers11.shift();
console.log(numbers11);
console.log(typeof str);
numbers11.splice(-2,1);
console.log(numbers11); */

/* const testResults = [3.89, 2.99, 1.38, 10];
console.log(testResults.slice(4));
console.log(testResults);
console.log(testResults.indexOf(1.38));
console.log(testResults.includes(1.38));

const personsData = [
  { name: 'John', age: 30 },
  { name: 'Pete', age: 20 },
  { name: 'Mary', age: 25 },
];
const age20 = personsData.find((person) => person.age === 20);
age20.age = 21;
console.log(age20, personsData);
const age30Index = personsData.findIndex((person) => person.age === 30);
console.log(age30Index); */

const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;
const taxAdjustedPrices = prices.map((price, idx) => {
  return { index: idx, taxAdjPrice: price * (1 + tax) };
});
console.log(taxAdjustedPrices);