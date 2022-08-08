const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const FilteredNumbers = numbers.filter((number) => number > 5);
//console.log(FilteredNumbers);

const numbersObject = numbers.map((num) => ({ num }));
//console.log(numbersObject);

const multiplicationAll = numbers.reduce((acc, number) => acc * number, 1);
//console.log(multiplicationAll);
//console.log(numbers);

function findMaxMin (...numbers) {
  let max = numbers[0];
  let min = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  for (const number of numbers) {
    /* if (numbers[i] > max) {
      max = numbers[i];
    } */
    if (number < min) {
      min = number;
    }
  }
  return [max, min];
}

const [max,min] = findMaxMin(...numbers);
console.log(max , min);

const userId = new Set();
userId.add(10);
userId.add(20);
userId.add(20);
console.log(userId);
