"use strict";
class User {
    constructor(name, age, password) {
        this.name = name;
        this.age = age;
        this.password = password;
        this.name = name;
        this.age = age;
        this.password = password;
    }
    print() {
        console.log(this.name);
    }
}
class Admin extends User {
    constructor(name, age, password, permissions) {
        super(name, age, password);
        this.permissions = permissions;
    }
}
const user = new User('Barry', 30, '123456');
console.log(user.name);
console.log(user.age);
// console.log(user.password);
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const button = document.querySelector('button');
var OutputMode;
(function (OutputMode) {
    OutputMode[OutputMode["CONSOLE"] = 0] = "CONSOLE";
    OutputMode[OutputMode["ALERT"] = 1] = "ALERT";
})(OutputMode || (OutputMode = {}));
// const results: { value: number; print: () => void }[] = [];
//const results: Array<any> = [];
const results = [];
//const results: Array<CalculationResult> = [];
const names = ['barry'];
button.addEventListener('click', function () {
    const num1 = +num1Input.value;
    const num2 = +num2Input.value;
    const result = add(num1, num2);
    const resultContainer = {
        value: result,
        print() {
            console.log(this.value);
        },
    };
    results.push(resultContainer);
    // results.push(5);
    //printResult(resultContainer.value);
    //printResult(results);
    results[0].print();
});
function add(a, b) {
    return a + b;
}
const result = add(1, 2);
console.log(result);
const isDone = false; // exact false value
let isDone2 = false; // boolean type
function printResult(result, printMode) {
    if (printMode === 'console') {
        console.log(result);
    }
    else {
        alert(result);
    }
}
printResult(result, 'console');
printResult(result, 'alert');
function printResult1(result, printMode) {
    if (printMode === OutputMode.CONSOLE) {
        console.log(result);
    }
    else {
        alert(result);
    }
}
printResult1(result, OutputMode.CONSOLE);
printResult1(result, OutputMode.ALERT);
function logAndEcho(val) {
    console.log(val);
    return val;
}
logAndEcho('Hi there!').split(' '); // generic function
