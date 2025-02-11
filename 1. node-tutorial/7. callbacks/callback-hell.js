const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading file', err);
    return;
  }
  console.log('first data: ', data);

  const modifyFileData = data.toUpperCase();

  fs.writeFile('output.txt', modifyFileData, (err) => {
    if (err) {
      console.error('Error writing file', err);
      return;
    }
    console.log('File written successfully');

    fs.readFile('output.txt', 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading file', err);
        return;
      }
      console.log('second data: ', data);
    });
  });
});
