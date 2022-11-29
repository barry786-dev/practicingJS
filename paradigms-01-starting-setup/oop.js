class Validator {
  static REQUIRED = 'REQUIRED';
  static MIN_LENGTH = 'MIN_LENGTH';
  static validate(value, flag, validatorValue) {
    if (flag === this.REQUIRED) {
      return value.trim().length > 0;
    }
    if (flag === this.MIN_LENGTH) {
      return value.trim().length >= validatorValue;
    }
  }
}

class User {
  constructor(uName, uPassword) {
    this.user = {
      userName: uName,
      password: uPassword,
    };
  }
  greet() {
    console.log('Hi there - I am ' + this.user.userName);
  }
}

class UserInputForm {
  constructor() {
    this.form = document.getElementById('user-input');
    this.userNameInput = document.getElementById('username');
    this.passwordInput = document.getElementById('password');
    this.form.addEventListener('submit', this.submitFormHandler.bind(this));
  }
  submitFormHandler(event) {
    event.preventDefault();
    const enteredUsername = this.userNameInput.value;
    const enteredPassword = this.passwordInput.value;
    if (
      !Validator.validate(enteredUsername, Validator.REQUIRED) ||
      !Validator.validate(enteredPassword, Validator.MIN_LENGTH, 5)
    ) {
      alert(
        'Invalid input - username or password must not be empty, and password must be at least 5 characters.'
      );
      return;
    }
    const newUser = new User(enteredUsername, enteredPassword);
    console.log(newUser.user);
    newUser.greet();
  }
}
new UserInputForm();

/* class Validator {
  constructor(userName, userPassword) {
    this.userName = userName;
    this.userPassword = userPassword;
  }
  validateValues() {
    if (
      this.userName.trim().length === 0 ||
      this.userPassword.trim().length === 0
    ) {
      alert('Invalid input - username or password must not be empty.');
      return false;
    }
    return true;
  }
}
class User {
  constructor(userName, userPassword) {
    this.userName = userName;
    this.userPassword = userPassword;
  }
  greet() {
    console.log('Hi there - I am ' + this.userName);
  }
}
class UserInputForm {
  constructor(formId) {
    this.formId = formId;
    this.form = document.getElementById(formId);
  }
  userNameValue() {
    const userNameInput = document.querySelector(`#${this.formId} #username`);
    this.userName = userNameInput.value;
  }
  userPasswordValue() {
    const passwordInput = document.querySelector(`#${this.formId} #password`);
    this.userPassword = passwordInput.value;
  }
  submitFormHandler(event) {
    event.preventDefault();
    this.userNameValue();
    this.userPasswordValue();
    const validator = new Validator(this.userName, this.userPassword);
    if (!validator.validateValues()) {
      return;
    }
    const user = new User(this.userName, this.userPassword);
    user.greet();
  }
}

const form = new UserInputForm('user-input');
form.form.addEventListener('submit', form.submitFormHandler.bind(form)); */
