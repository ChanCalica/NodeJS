const lodash = require('lodash');

const names = ['chan', 'isabel', 'crystal', 'sabrina', 'maria'];

const capitalizedNames = lodash.map(names, (name) => name.toUpperCase());
const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalizedNames);
console.log(capitalize);
