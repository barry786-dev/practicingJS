const storeBtn = document.getElementById('store-btn');

const retrieveBtn = document.getElementById('retrieve-btn');

let db;

const dbRequest = indexedDB.open('StorageDummy', 1);

dbRequest.onsuccess = function (event) {
  db = event.target.result;
};

dbRequest.onupgradeneeded = function (event) {
  db = event.target.result;

  const objStore = db.createObjectStore('products', { keyPath: 'id' });

  objStore.transaction.oncomplete = function (event) {
    const productsStore = db
      .transaction('products', 'readwrite')
      .objectStore('products');
    productsStore.add({
      id: 'p1',
      title: 'A First Product',
      price: 12.99,
      tags: ['Expensive', 'Luxury'],
    });
  };
};

dbRequest.onerror = function (event) {
  console.log('ERROR!');
};

storeBtn.addEventListener('click', () => {
  if (!db) {
    return;
  }
  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');
  productsStore.add({
    id: 'p2',
    title: 'A Second Product',
    price: 15.99,
    tags: ['Expensive', 'Luxury'],
  });
});

retrieveBtn.addEventListener('click', () => {
  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');
  const request = productsStore.get('p2');
  request.onsuccess = function () {
    console.log(request.result);
  };
});
