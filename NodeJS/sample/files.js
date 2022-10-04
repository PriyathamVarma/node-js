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


// Non-Blocking version
fs.readFile('./sample.txt','utf-8',(err,res)=>{
    console.log(res);
})

// Writing using callbacks
fs.writeFile('./sample.txt','Node Js rocks',(err)=>{
    if (err) throw err;
    console.log('Text added....');
})

