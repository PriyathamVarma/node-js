# This file is about why Node js

> NodeJS is a JS Runtime built on Googles V8 engine

## What is runtime?

- Environment for a programming language to run.
- Generally JS along with html and css runs on browser
- But? it cant run outside of a browser
- Solution: NODEJS container environment

## Uses

- Backend development
- Real-time applications
- APIs with databases

## Companies using

- netflix
- uber
- paypal
- ebay


### Example showing how to read or write to a file using nodejs

```
// This file is for showing examples on file reading and writing

// Import fileSync package 
const fs = require('fs');

// Reading synchronously
const txt = fs.readFileSync('./sample.txt','utf-8'); // The content from sample.txt will be read by NodeJS

// console log the vraible
console.log(txt);


// Writing to the files
const writeTxt = 'Write something and show it';
fs.writeFileSync('./sample.txt',writeTxt);// this will overwrite the info

```



