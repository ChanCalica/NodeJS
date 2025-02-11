require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');
const bookRoutes = require('./routes/book-routes');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
