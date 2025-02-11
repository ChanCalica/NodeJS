const express = require('express');
const app = express();

app.use(express.json());

let books = [
  {
    id: 1,
    name: 'The Lord of the Rings',
  },
  {
    id: 2,
    name: 'The Hobbit',
  },
  {
    id: 3,
    name: 'The Silmarillion',
  },
];

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bookstore api' });
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    // res.sendStatus(404);
    res.status(404).json({ message: 'Book not found' });
  }
});

app.post('/books', (req, res) => {
  //   const book = req.body;
  //   if (!book.name) {
  //     return res.status(400).json({ message: 'Book name is required' });
  //   }
  //  book.id = books.length + 1;
  const newBook = {
    // id: books.length + 1,
    // name: `Book ${books.length + 1}`,
    id: Math.floor(Math.random() * 1000),//.toString(),
    name: 'Book ' + Math.floor(Math.random() * 1000),
  };

  books.push(newBook);
  //   res.status(201).json(newBook);
  res.status(201).json({
    data: newBook,
    message: 'Book created successfully',
  });
});

app.put('/books/:id', (req, res) => {
  const currentBook = books.find((book) => book.id === parseInt(req.params.id));

  if (currentBook) {
    currentBook.name = req.body.name || currentBook.name;

    res.status(200).json({
      data: currentBook,
      message: `Book ${currentBook.id} updated successfully`,
    });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/books/:id', (req, res) => {
  const findIndexOfCurrentBook = books.findIndex(
    (book) => book.id === parseInt(req.params.id)
  );
  if (findIndexOfCurrentBook !== -1) {
    const deletedbook = books.splice(findIndexOfCurrentBook, 1);
    res.status(200).json({
      message: `Book ${req.params.id} deleted successfully`,
      data: deletedbook[0],
    });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
