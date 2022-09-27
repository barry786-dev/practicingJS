const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

const userId = 'u123';
const user = {
  name: 'Barry',
  age: 40,
  hobbies: ['Sports', 'Cooking']
};

// localStorage
/* storeBtn.addEventListener('click', () => {
  localStorage.setItem('uid', userId);
  localStorage.setItem('user', JSON.stringify(user));
});

retrieveBtn.addEventListener('click', () => {
  const extractedId = localStorage.getItem('uid');
  const extractedUser = JSON.parse(localStorage.getItem('user'));
  console.log(extractedUser)
  
  if (extractedId) {
    console.log('Got the id - ' + extractedId);
  } else {
    console.log('Could not find id.');
  }
}); */
// sessionStorage
storeBtn.addEventListener('click', () => {
  sessionStorage.setItem('uid', userId);
  sessionStorage.setItem('user', JSON.stringify(user));
});

retrieveBtn.addEventListener('click', () => {
  const extractedId = sessionStorage.getItem('uid');
  const extractedUser = JSON.parse(sessionStorage.getItem('user'));
  console.log(extractedUser)
  
  if (extractedId) {
    console.log('Got the id - ' + extractedId);
  } else {
    console.log('Could not find id.');
  }
});
