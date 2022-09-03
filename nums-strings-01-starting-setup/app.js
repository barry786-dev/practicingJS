console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Math.pow(2, 53) - 1); // 9007199254740991
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(0.2 + 0.4); // 0.6000000000000001
console.log((0.2 + 0.4).toFixed(2)); // 0.60
console.log(0.2 + 0.4 === 0.6); // false
console.log((5).toString(2)); // 101
console.log((1 / 5).toString(2)); // 0.0011001100110011001100110011001100110011001100110011001101
console.log((0.2).toString(2)); // 0.0011001100110011001100110011001100110011001100110011001101
console.log((0.2).toFixed(20)); // 0.20000000000000001110
Number.isFinite(Infinity); // false
Number.isNaN(NaN); // true
Math.random(); // 0.123456789

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// tag template

function tag(strings, ...values) {
  console.log(strings);
  console.log(values);
  let ageCategory = 'young';
  if (values[1] > 60) {
    ageCategory = 'old';
  } else if (values[1] > 30) {
    ageCategory = 'middle-aged';
  }
  return `${strings[0]}${values[0]}${strings[1]}${ageCategory}${strings[2]}`;
  // return {
  //   strings,
  //   values,
  // }
}
const userName = 'Bob';
const age = 20;
const tagRet = tag`Hello ${userName}! You are ${age} years old!`;
console.log(tagRet); // Hello Bob! You are young years old!
