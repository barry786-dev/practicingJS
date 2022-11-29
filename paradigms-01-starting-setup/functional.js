const REQUIRED = 'REQUIRED';
const MIN_LENGTH = 'MIN_LENGTH';

function getUserInput1(formId) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}

function validate(value, flag, validateValues) {
  if (flag === REQUIRED) {
    return value.trim().length > 0;
  }
  if (flag === MIN_LENGTH) {
    return value.trim().length > validateValues;
  }
}

function getUserInput(inputElementId) {
  return document.getElementById(inputElementId).value;
}

function createUser(username, password) {
  if (!validate(username, REQUIRED) || !validate(password, MIN_LENGTH, 5)) {
    throw new Error(
      'Invalid input - username or password must not be empty, and password must be at least 5 characters.'
    );
  }
  return {
    username: username,
    password: password,
  };
}

function greetUser(user) {
  console.log('Hi there - I am ' + user.username);
}

function signupHandler(event) {
  event.preventDefault();
  // const data = getUserInput1(event.target.id);
  const enteredUsername = getUserInput('username');
  const enteredPassword = getUserInput('password');
  try {
    const newUser = createUser(enteredUsername, enteredPassword);
    greetUser(newUser);
  } catch (err) {
    alert(err.message);
  }
}

function connectForm(formId, handler) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', handler);
}

connectForm('user-input', signupHandler);
