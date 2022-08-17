//const productList = {
// products: [
//   new Product(
//     'A pillow',
//     'https://via.placeholder.com/200x200',
//     'A pillow is a type of soft bedding designed to support the head and upper body of a person.',
//     10
//   ),
//   new Product(
//     'A carpet',
//     'https://via.placeholder.com/200x200',
//     'A carpet is a type of floor covering made from a combination of thin woven fabric and batting or wadding.',
//     20
//   ),
/* {
      id: 1,
      title: 'Product 1',
      price: 10,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
      image: 'https://via.placeholder.com/200x200',
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
      image: 'https://via.placeholder.com/200x200',
    }, */
// ],
/* render() {
    const renderHook = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    this.products.forEach((product) => {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      prodEl.innerHTML = `
      <div>
        <img src="${product.imageUrl}" alt="${product.title}">
        <div class="product-item__content">
          <h2>${product.title}</h2>
          <p>\$${product.price}</p>
          <p>${product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>`;
      prodList.append(prodEl);
    });
    renderHook.append(prodList);
  }, */
//};
const products = [
  {
    title: 'Product 1',
    price: 10,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    image: 'https://via.placeholder.com/200x200',
  },
  {
    title: 'Product 2',
    price: 20,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    image: 'https://via.placeholder.com/200x200',
  },
];

class Product {
  // title = 'DEFAULT';
  // imageUrl = 'assets/images/products/';
  // description = 'DEFAULT';
  // price;

  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

class ShoppingCart {
  items = [];
  total = 0;

  addProduct(product) {
    this.items.push(product);
    this.total += product.price;
    this.totalOutput.innerText = `Total: \$${this.total}`;
  }
  render() {
    const cartEl = document.createElement('section');
    cartEl.className = 'cart';
    const cartItems = `
  <h2>Total: \$${0}</h2>
  <button>Checkout</button>
    `;
    cartEl.innerHTML = cartItems;
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }
  addToCart() {
    console.log('Add to cart' + this.product.title);
    App.addProductToCart(this.product);
  }
  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}">
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <p>\$${this.product.price}</p>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>`;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  /* products = [
    new Product(
      'A pillow',
      'https://via.placeholder.com/200x200',
      'A pillow is a type of soft bedding designed to support the head and upper body of a person.',
      10
    ),
    new Product(
      'A carpet',
      'https://via.placeholder.com/200x200',
      'A carpet is a type of floor covering made from a combination of thin woven fabric and batting or wadding.',
      20
    ),
  ]; */
  products = [];
  constructor(ArrayOfProducts) {
    ArrayOfProducts.forEach((pro) => {
      const { title, image, description, price } = pro;
      this.products.push(new Product(title, image, description, price));
    });
  }
  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    this.products.forEach((product) => {
      const prodEl = new ProductItem(product).render();
      prodList.append(prodEl);
    });
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');
    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList(products);
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
   // this.cart.render();
  }
}

App.init();
