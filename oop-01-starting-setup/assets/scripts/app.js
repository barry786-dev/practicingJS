const productList = {
  products: [
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
        <img src="${product.image}" alt="${product.title}">
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
};

productList.render();
