import { renderProducts } from './rendering';
import {products} from './products';

function addProduct(event) {
  event.preventDefault();
  import('./product-management').then(({ addProduct }) => {
    addProduct();
  });
}

function deleteProduct(prodId) {
  import('./product-management').then(({ deleteProduct }) => {
    deleteProduct(prodId);
  });
}

function initProducts() {
  renderProducts(products, deleteProduct);
}

const addProductForm = document.getElementById('new-product');

initProducts();

addProductForm.addEventListener('submit', addProduct);
