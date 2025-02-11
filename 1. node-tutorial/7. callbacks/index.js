/**
 * Greets a person by name and executes a callback function.
 *
 * @param {string} name - The name of the person to greet.
 * @param {Function} callbackFn - The callback function to execute after greeting.
 */

const fs = require('fs');
function person(name, callbackFn) {
  console.log(`Hello ${name}`);
  callbackFn();
}

function address() {
  console.log('Philippines');
}

person('Chan', address);

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading file', err);
    return;
  }

  console.log(data);
});
