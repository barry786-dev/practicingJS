import { products } from './products';
import { updateProducts } from './rendering';

const titleEl = document.getElementById('title');
const priceEl = document.getElementById('price');

export function deleteProduct(prodId) {
  const productToDeleteIndex = products.findIndex((p) => p.id === prodId);
  const [productToDelete] = products.splice(productToDeleteIndex, 1);
  updateProducts(productToDelete, prodId, null, false);
}

export function addProduct() {
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
