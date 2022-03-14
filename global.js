// to import external modules
const path = require('path') // to work with directories and files locations or paths

console.log(`The dirname is ${path.dirname(__dirname)}`)
console.log(`The filename is ${path.basename(__filename)}`)


console.log(__dirname);
console.log(__filename);


//process object --> process.argv

console.log(process.argv) // this is an array

//use array destructucting

const [, , firstname, lastname] = process.argv

console.log(firstname)