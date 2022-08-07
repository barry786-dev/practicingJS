/* const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)

if (randomNumber > 0.7) {
  alert('it is greater than 0.7');
} else {
  alert('it is less than 0.7');
}

const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

for (const num of arr) {
  console.log(num);
}

let i = 0;
while (i < arr.length) {
  console.log(arr[i]);
  i++;
}

for (let i = arr.length - 1; i >= 0; i--) {
  console.log(arr[i]);
}

const newRandomNumber = Math.random();

if (
  (newRandomNumber > 0.7 && randomNumber > 0.7) ||
  newRandomNumber <= 0.2 ||
  randomNumber <= 0.2
) {
  alert('it is greater achieved');
} else {
  alert('it is less not achieved');
}
 */
function getname() {
  return prompt('What is your name?');
}

function greet() {
  const userName = getname();
  console.log(userName);
}

greet();