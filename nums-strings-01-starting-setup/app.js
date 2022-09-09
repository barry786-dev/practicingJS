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

function tag(strings) {
  console.log(strings.raw[0]);
}

tag`string text line 1 \n string text line 2`;

// RegExp
const userEmail = 'test@test.com';
userEmail.includes('@'); // true
userEmail.match(/\S+@\S+\.\S+/); // ["
const regEx = /\S@\S+\.\S/;
regEx.exec(userEmail); // ["
console.log(regEx.test(userEmail)); // true

const regEx2 = /hello/;
console.log(regEx2.test('hello world')); // true
console.log(regEx2.test('Hello world')); // false
let regEx3 = /hello/i;
regEx3 = /(h|H)ello/;
console.log(regEx3.test('Hello world')); // true
const regEx4 = /hello/g;
console.log(regEx4.test('Hello world')); // false
const regEx5 = /.ello/; // wildcard
console.log(regEx5.test('jellok world')); // true


