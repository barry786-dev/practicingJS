import { initProducts, addProduct } from './product-management';

function addProduct(event) {
  import('./product-management').then(({ addProduct }) => {
    addProduct(event);
  });
}

const addProductForm = document.getElementById('new-product');

initProducts();

addProductForm.addEventListener('submit', addProduct);
