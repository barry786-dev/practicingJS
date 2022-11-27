import { products as prod } from './products';
import { updateProducts } from './rendering';

let products = prod;

export function deleteProduct(prodId) {
  const updatedProducts = [];
  let productToDelete;
  for (const prod of products) {
    if (prod.id !== prodId) {
      updatedProducts.push(prod);
    } else {
      productToDelete = prod;
    }
  }
  products = updatedProducts;
  updateProducts(productToDelete, prodId, null, false);
}

export function addProduct() {
  const titleEl = document.querySelector('#new-product #title');
  const priceEl = document.querySelector('#new-product #price');

  const title = titleEl.value;
  const price = priceEl.value;

  if (title.trim().length === 0 || price.trim().length === 0 || +price < 0) {
    alert('Please enter some valid input values for title and price.');
    return;
  }

  const newProduct = {
    id: new Date().toString(),
    title: title,
    price: price,
  };

  products.unshift(newProduct);
  updateProducts(newProduct, newProduct.id, deleteProduct, true);
  //renderProducts(products, deleteProduct);
}
