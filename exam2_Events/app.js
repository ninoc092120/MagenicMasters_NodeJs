const yargs = require('yargs');
const argv = yargs.argv;

console.log('test');
console.log(argv.name);
console.log(argv.path);