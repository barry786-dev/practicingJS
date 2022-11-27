const renderedProducts = []

export function renderProducts(products, deleteProductFn) {
  const productListEl = document.getElementById('product-list');
  if (products.length > 1) {
    productListEl.innerHTML = '';
  }
  const start = performance.now();
  products.forEach((product) => {
    const newListEl = document.createElement('li');
    // const prodTitleEl = document.createElement('h2');
    // const prodPriceEl = document.createElement('p');
    newListEl.innerHTML = `
      <h2>${product.title}</h2>
      <p>$${product.price}</p>
    `;
    const prodDeleteButtonEl = document.createElement('button');

    // prodTitleEl.innerHTML = product.title;
    // prodPriceEl.innerHTML = product.price;
    prodDeleteButtonEl.textContent = 'DELETE';

    newListEl.id = product.id;

    prodDeleteButtonEl.addEventListener(
      'click',
      deleteProductFn.bind(null, product.id)
    );

    // newListEl.appendChild(prodTitleEl);
    // newListEl.appendChild(prodPriceEl);
    newListEl.appendChild(prodDeleteButtonEl);
    if (products.length > 1) {
      productListEl.appendChild(newListEl);
    } else {
      //productListEl.insertBefore(newListEl, productListEl.firstChild);
      productListEl.insertAdjacentElement('afterbegin', newListEl);
    }
    renderedProducts.push(newListEl); // will lead to memory leak, as there is reference to this element then js engine can't garbage collect it even when we delete it from DOM
  });
  const end = performance.now();
  console.log(`Rendering ${products.length} products took ${end - start} ms`);
}

export function updateProducts(product, prodId, deleteProductFn, isAdding) {
  if (isAdding) {
    renderProducts([product], deleteProductFn);
  } else {
    const productEl = document.getElementById(prodId);
    // productEl.remove();
    productEl.parentNode.removeChild(productEl);
  }
}
