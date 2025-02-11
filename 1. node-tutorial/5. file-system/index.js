const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, 'data');

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log('data folder created');
}

// fs.mkdir(dataFolder, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Folder created');
//   }
// });

const filePath = path.join(dataFolder, 'hello.txt');

//sync way of creating the file
fs.writeFileSync(filePath, 'Hello World');
console.log('file created successfully');

const readContentFromFile = fs.readFileSync(filePath, 'utf8');
console.log('file content', readContentFromFile);

fs.appendFileSync(filePath, ', How are you?');
fs.appendFileSync(filePath, '\nHow are you?');
console.log('file updated successfully');

// async way of creating the file
const asyncFilePath = path.join(dataFolder, 'hello-async.txt');
fs.writeFile(asyncFilePath, 'Hello Worrd', (err) => {
  if (err) throw err;
  console.log('Async file is created successfully');

  fs.readFile(asyncFilePath, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('Async file content:', data);

    fs.appendFile(asyncFilePath, '\nThis is new line', (err, data) => {
      if (err) throw err;
      console.log('A new line is added in Async file');

      fs.readFile(asyncFilePath, 'utf-8', (err, updatedData) => {
        if (err) throw err;
        console.log('Async file content:', updatedData);
      });
    });
  });
});
