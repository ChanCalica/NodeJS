const express = require('express');
const app = express();

//root route
app.get('/', (req, res) => {
  res.send('Home Page');
});

// get all products
app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ];

  res.json(products);
});

// get a single product
app.get('/products/:id', (req, res) => {
  console.log(req.params);
  const productId = parseInt(req.params.id);
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
  ];

  const getSingleProduct = products.find((product) => product.id === productId);

  if (getSingleProduct) {
    res.json(getSingleProduct);
  } else {
    res.status(404).send('Product not found');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
