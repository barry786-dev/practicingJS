const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

storeBtn.addEventListener('click', () => {
  const userId = 'u123';
  const user = { name: 'Barry', age: 40, hobbies: ['Sports', 'Cooking'] };
  document.cookie = `uid=${userId}; max-age=2`;
  // document.cookie = `uid=${userId}; expires=Thu, 27 Sep 2022 12:00:00 UTC`;
  document.cookie = `user=${JSON.stringify(user)}`;
});

retrieveBtn.addEventListener('click', () => {
  const cookieData = document.cookie.split(';');
  const data = cookieData.map(i => {
    return i.trim();
  });
  console.log(data[1].split('=')[1]); // user value
});
