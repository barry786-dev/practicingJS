const form = document.getElementById('user-input');

function submitFormHandler(event) {
  event.preventDefault();

  const userNameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  const enteredUsername = userNameInput.value;
  const enteredPassword = passwordInput.value;

  if (
    enteredUsername.trim().length === 0 ||
    enteredPassword.trim().length === 0
  ) {
    alert('Invalid input - username or password must not be empty.');
    return;
  }
  const user = {
    userName: enteredUsername,
    password: enteredPassword
  };

  console.log(user);
  console.log('Hi there - I am '  + user.userName);
}

form.addEventListener('submit', submitFormHandler);
