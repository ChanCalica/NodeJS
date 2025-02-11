//module.exports -> export
//requre -> import

//import a from './first-module';

const firstModule = require('./first-module');

console.log(firstModule.add(2, 2));

try {
  console.log('trying to divide by zero');

  let result = firstModule.divide(2, 0);
  console.log(result, 'result');
} catch (error) {
  console.log('Error: ', error.message);
}

// //module wrapper
// (
//     function (exports, require, module, __filename, __dirname) {
//         //your module code goes here
//     }
// )
