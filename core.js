// require function to load modules

const path = require("path");

//core modules are modules that came with node installation

const message = path.join(__dirname, "sample", "inside_sample", "core_extension")

console.log(message)

//using utility module for timestamps

const util = require('util')

util.log('hello')