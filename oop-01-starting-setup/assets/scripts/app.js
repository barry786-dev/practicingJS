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

class ProductItem {
  constructor(product) {
    this.product = product;
  }
  addToCard () {
    console.log('Add to cart' + this.product.title);
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
    addCartButton.addEventListener('click', this.addToCard.bind(this));
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
    const renderHook = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    this.products.forEach((product) => {
      const prodEl = new ProductItem(product).render();
      prodList.append(prodEl);
    });
    renderHook.append(prodList);
  }
}
const productList = new ProductList(products);

productList.render();
