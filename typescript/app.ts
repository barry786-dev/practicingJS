/* class User {
  name: string;
  public age: number;
  private password: string;
  constructor( name: string, age: number, password: string ) {
    this.name = name;
    this.age = age;
    this.password = password;
  }
} */
interface GreetAble {
  name: string;
} // use it to force classes to have certain structure
interface PrintAble {
  print(): void;
}
class User implements GreetAble, PrintAble {
  constructor(
    public name: string,
    public age: number,
    private password: string
  ) {
    this.name = name;
    this.age = age;
    this.password = password;
  }
  print() {
    console.log(this.name);
  }
}

class Admin extends User {
  constructor(
    name: string,
    age: number,
    password: string,
    private permissions: string[]
  ) {
    super(name, age, password);
  }
}

const user = new User('Barry', 30, '123456');
console.log(user.name);
console.log(user.age);
// console.log(user.password);

const num1Input = document.getElementById('num1') as HTMLInputElement;
const num2Input = <HTMLInputElement>document.getElementById('num2');
const button = document.querySelector('button')!;

interface CalculationContainer {
  value: number;
  print(): void;
} // you can use it as type or classes
type CalculationResult = CalculationContainer[];
// type CalculationResult = { value: number; print: () => void }[];
type PrintMode = 'console' | 'alert';
type Calculation = 'add' | 'subtract';
type Combinable = number | string;
enum OutputMode {
  CONSOLE,
  ALERT,
}

// const results: { value: number; print: () => void }[] = [];
//const results: Array<any> = [];
const results: CalculationResult = [];
//const results: Array<CalculationResult> = [];
const names = ['barry'];

button.addEventListener('click', function () {
  const num1 = +num1Input.value;
  const num2 = +num2Input.value;
  const result = add(num1, num2);
  const resultContainer: { value: number; print: () => void } = {
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

function add(a: number, b: number) {
  return a + b;
}

const result = add(1, 2);
console.log(result);

const isDone = false; // exact false value
let isDone2 = false; // boolean type

function printResult(result: any, printMode: 'console' | 'alert'): void {
  if (printMode === 'console') {
    console.log(result);
  } else {
    alert(result);
  }
}
printResult(result, 'console');
printResult(result, 'alert');

function printResult1(result: any, printMode: OutputMode): void {
  if (printMode === OutputMode.CONSOLE) {
    console.log(result);
  } else {
    alert(result);
  }
}
printResult1(result, OutputMode.CONSOLE);
printResult1(result, OutputMode.ALERT);


function logAndEcho<T>(val: T) {
  console.log(val);
  return val;
}
logAndEcho<string>('Hi there!').split(' '); // generic function
