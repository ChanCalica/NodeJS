const express = require('express');
const app = express();
const path = require('path');
const { title } = require('process');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const products = [
  {
    id: 1,
    name: 'Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
  },
  {
    id: 3,
    name: 'Product 3',
  },
];

app.get('/', (req, res) => {
  res.render('home', { title: 'Home', products: products });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About page' });
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
