"use strict";
(self["webpackChunkmy_place"] = self["webpackChunkmy_place"] || []).push([["src_optimized_product-management_js"],{

/***/ "./src/optimized/product-management.js":
/*!*********************************************!*\
  !*** ./src/optimized/product-management.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProduct": () => (/* binding */ addProduct),
/* harmony export */   "deleteProduct": () => (/* binding */ deleteProduct)
/* harmony export */ });
/* harmony import */ var _products__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./products */ "./src/optimized/products.js");
/* harmony import */ var _rendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rendering */ "./src/optimized/rendering.js");


const titleEl = document.getElementById('title');
const priceEl = document.getElementById('price');
function deleteProduct(prodId) {
  const productToDeleteIndex = _products__WEBPACK_IMPORTED_MODULE_0__.products.findIndex(p => p.id === prodId);
  const [productToDelete] = _products__WEBPACK_IMPORTED_MODULE_0__.products.splice(productToDeleteIndex, 1);
  (0,_rendering__WEBPACK_IMPORTED_MODULE_1__.updateProducts)(productToDelete, prodId, null, false);
}
function addProduct() {
  const title = titleEl.value;
  const price = priceEl.value;
  if (title.trim().length === 0 || price.trim().length === 0 || +price < 0) {
    alert('Please enter some valid input values for title and price.');
    return;
  }
  const newProduct = {
    id: new Date().toString(),
    title: title,
    price: price
  };
  _products__WEBPACK_IMPORTED_MODULE_0__.products.unshift(newProduct);
  (0,_rendering__WEBPACK_IMPORTED_MODULE_1__.updateProducts)(newProduct, newProduct.id, deleteProduct, true);
  //renderProducts(products, deleteProduct);
}

/***/ })

}]);
//# sourceMappingURL=src_optimized_product-management_js.js.map