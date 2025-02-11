const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = 30001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
