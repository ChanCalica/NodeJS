const express = require('express');
const app = express();

// define middleware function
const middleware = (req, res, next) => {
  // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} ${req.method}`);
  console.log('this middleware will run on every request');
  next();
};

app.use(middleware);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
