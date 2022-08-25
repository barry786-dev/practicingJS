/* function SecretiveProto() {
  secret = 'The Class is a lie!';
  this.spillTheBeans = function () {
    console.log(secret);
  };
} */

/* const blabbermouth = new SecretiveProto();
try {
console.log(blabbermouth.secret);
}
catch(e) {
  console.log(e);
}

blabbermouth.spillTheBeans(); // "The Class is a lie!" */
/* class SecretiveClass {
  constructor() {
    const secret = "I am a lie!"
    this.spillTheBeans = function() {
      console.log(secret)
    }
  }

  looseLips() {
    console.log(secret)
  }
} */

// const liar = new SecretiveClass()
// try {
//   console.log(liar.secret)
// }
// catch(e) {
 // console.log(e) // TypeError: SecretiveClass.secret is not defined
// }
// liar.spillTheBeans() // "I am a lie!"
/* try {
  liar.looseLips();
} catch (e) {
  console.log(e, 'your code will not be broke'); // TypeError: SecretiveClass.secret is not defined
} */
//console.log('i am still here');

/* function makeFunc() {
  const name = 'Mozilla';
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc(); */

/* for (var i = 0; i < 2; i++) {
  const button = document.createElement('button');
  button.innerText = `Button ${i}`;
  button.onclick = function () {
    console.log(i);
  };
  document.body.appendChild(button);
} */
for (var i = 0; i < 2; i++) {
  const button = document.createElement('button');
  button.innerText = `Button ${i}`;
  button.onclick = (function (copyOfI) {
    return () => {
      console.log(copyOfI);
    };
  })(i);
  document.body.appendChild(button);
}