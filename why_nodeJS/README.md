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
> Run node <filename> on your CLi to run the file

## Blocking and Non-Blocking
  
- Blocking: Step-wise codes get executed
- This means step2 can only exit if step1 is done  
- Non-Blocking: No need for waiting for the function to finish execute
  
### Non-Blocking version
  
```
  // Non-Blocking version
fs.readFile('./sample.txt','utf-8',(err,res)=>{
    console.log(res);
})
  
  // Writing using callbacks
fs.writeFile('./sample.txt','Node Js rocks',(err)=>{
    if (err) throw err;
    console.log('Text added....');
})
  ```
  
> Here the fs method is calling another function(call back) and returns the value when the execution is done  

### Creating a server

```
// This file is for creating a simple web server
// Imports
const http = require('http');

// Files



// Server
// Create server
// Start server to listen to reqs
const server = http.createServer((req,res)=>{
    res.end("the server says hai");
});


server.listen(8080,()=>{
    console.log(`http://localhost:8080/`)
});
  
```
