/* const productList = {
products: [
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
{
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
    },
],
render() {
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
  },
}; */
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
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}
class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }
  render() {}

  CreateRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}
class ShoppingCart extends Component {
  items = [];

  /**
   * @param {any[]} value
   */
  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerText = `Total: \$${this.totalAmount.toFixed(2)}`;
  }

  get totalAmount() {
    const sum = this.items.reduce((a, b) => a + b.price, 0);
    return sum;
  }
  constructor(renderHookId) {
    super(renderHookId, false);
    this.checkoutClicked = () => {
      console.log('Checkout clicked');
      console.log(this.items);
    };
    this.render();
  }
  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }
  render() {
    // const cartEl = document.createElement('section');
    // cartEl.className = 'cart';
    const cartEl = this.CreateRootElement('section', 'cart', []);
    cartEl.innerHTML = `
  <h2>Total: \$${0}</h2>
  <button>Checkout</button>
    `;
    const checkOutBtn = cartEl.querySelector('button');
    //checkOutBtn.addEventListener('click', this.checkoutClicked.bind(this));
    //checkOutBtn.addEventListener('click', () => this.checkoutClicked());
    checkOutBtn.addEventListener('click', this.checkoutClicked);
    this.totalOutput = cartEl.querySelector('h2');
    //return cartEl;
  }
}
class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }
  addToCart() {
    console.log('Add to cart' + this.product.title);
    App.addProductToCart(this.product);
  }
  render() {
    //const prodEl = document.createElement('li');
    //prodEl.className = 'product-item';
    const prodEl = this.CreateRootElement('li', 'product-item', []);
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
    //return prodEl;
  }
}
class ProductList extends Component {
  #products = [];
  constructor(ArrayOfProducts, renderHookId) {
    super(renderHookId, false);
    this.render();
    this.#fetchProducts(ArrayOfProducts);
  }

  #fetchProducts(ArrayOfProducts) {
    ArrayOfProducts.forEach((pro) => {
      const { title, image, description, price } = pro;
      this.#products.push(new Product(title, image, description, price));
    });
    this.renderProducts();
  }

  renderProducts() {
    this.#products.forEach((product) => {
      new ProductItem(product, 'prod-list');
    });
  }

  render() {
    const prodList = this.CreateRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
  }
}
class Shop {
  constructor() {
    this.render();
  }
  render() {
    this.cart = new ShoppingCart('app');
    new ProductList(products, 'app');
  }
}
class App {
  static cart;
  static init() {
    const shop = new Shop();
    //shop.render();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
    // this.cart.render();
  }
}
App.init();
