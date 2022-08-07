const sayHello = (name = 'Arnst') => console.log('Hi ' + name);

//const sayHello = (phrase, name) => console.log(phrase + ' ' + name);

//const sayHello = () => console.log('Hi Max');
//const sayHello = name => 'Hi ' + name;
sayHello();

const checkInput = (cb, ...inputs) => {
  let shouldBreak = false;
  inputs.forEach((input) => {
    if (shouldBreak) return;
    if (!input || typeof input !== 'string') {
      cb('Please fill in all fields with valid input which is a string');
      shouldBreak = true;
    }
  });
};

const message = (str) => console.log(str);

checkInput(message, 'ho', 'ka', 'la', true, '');
