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
  
### Routing
  
```
// This file is for creating a simple web server
// Imports
const http = require('http');

// Files

// Server
// Create server
// Start server to listen to reqs
const server = http.createServer((req,res)=>{
    console.log(req.url);// to capture the url
    const path = req.url;

    if(path === '/main'){
        res.end("You are in main");
    }
    else if(path === '/index'){
        res.end("You are in index");
    }
    else{
        res.writeHead(404,{

            'Content-type':'text/html',

        });// 404 is the status code for page not found
        res.end("<h1>Page Not found</h1>");
    }
    
});


server.listen(8080,()=>{
    console.log(`http://localhost:8080/`)
});


 ```
### APIs
  
  ```
// This file is for creating a simple web server
// Imports
const fs = require('fs');
const http = require('http');

// Files



// Server
// Create server
// Start server to listen to reqs
const server = http.createServer((req,res)=>{
    console.log(req.url);// to capture the url
    const path = req.url;

    if(path === '/main'){
        res.end("You are in main");
    }
    else if(path === '/api'){
        // get the data from data.json
        //fs.readFile('./data.json');// Instead of ./ we can use --dirname
        fs.readFile(`${__dirname}/data.json`,'utf-8',(err,data)=>{
            // Parse the string to object
            if(err){
                console.log(err);
            };
            const dataObj = JSON.parse(data);
            console.log(dataObj);
            res.writeHead(200,{
                'Content-type':'application/json',
            });
            res.end(data);// here it is data which is the string that should be rendered
        });
    }
    else{
        res.writeHead(404,{

            'Content-type':'text/html',

        });// 404 is the status code for page not found
        res.end("<h1>Page Not found</h1>");
    }
    
});


server.listen(8080,()=>{
    console.log(`http://localhost:8080/`)
});

  
  ```

  ### Optimising the code:APIs
  
  ```
  // This file is for creating a simple web server
// Imports
const fs = require('fs');
const http = require('http');

// Files

// Having apis data
const reqData = fs.readFileSync(`${__dirname}/data.json`,'utf-8');// Only should be rendered once the object is called
const dataObj = JSON.parse(reqData);


// Server
// Create server
// Start server to listen to reqs
const server = http.createServer((req,res)=>{
    console.log(req.url);// to capture the url
    const path = req.url;

    if(path === '/main'){
        res.end("You are in main");
    }
    else if(path === '/api'){

            res.writeHead(200,{
                'Content-type':'application/json',
            });

            res.end(reqData);// here it is data which is the string that should be rendered
        }
    else{
        res.writeHead(404,{

            'Content-type':'text/html',

        });// 404 is the status code for page not found
        res.end("<h1>Page Not found</h1>");
    }
    
});


server.listen(8080,()=>{
    console.log(`http://localhost:8080/`)
});

  ```
 ### HTML templating
  - sample.html
  
  ```
<!DOCTYPE html>
<html>
    <head>
        <title>HTML Templating</title>
    </head>

    <body>
        <div>

            <h1>name: {%NAME%}</h1>
            <p>age: {%AGE%}</p>

        </div>
        
    </body>
</html>
  
  ```
 - server.js
  
  ```
  // This file is for creating a simple web server
// Imports
const fs = require('fs');
const http = require('http');

// Files

const replaceTemplate = (arg1,arg2) =>{

    let output = arg1.replace(/{%NAME%}/g,arg2.name);
    // mutate let variable again
    output.replace(/{%AGE%}/g,arg2.age);

    return output;
}

// Having apis data
const reqData = fs.readFileSync(`${__dirname}/data.json`,'utf-8');// Only should be rendered once the object is called
const dataObj = JSON.parse(reqData);

// reading html files
const reqHTMLData = fs.readFileSync(`${__dirname}/sample.html`,'utf-8');

// Server
// Create server
// Start server to listen to reqs
const server = http.createServer((req,res)=>{
    console.log(req.url);// to capture the url
    const path = req.url;

    if(path === '/page'){

        res.writeHead(200,{
            'Content-type':'text/html',
        });

        const renderHTML = dataObj.map(el => replaceTemplate(reqHTMLData,el)).join('');// With join all strings are joined
        console.log(renderHTML);

        res.end(renderHTML);
    }
    else{
        res.writeHead(404,{

            'Content-type':'text/html',

        });// 404 is the status code for page not found
        res.end("<h1>Page Not found</h1>");
    }
    
});


server.listen(8080,()=>{
    console.log(`http://localhost:8080/`)
});

  
  ```
  
 ### URL parsing
 > To get the params of a URL
 > enter localhost:8080/api?id=1
 
 ```
 // This file is for creating a simple web server
// Imports
const fs   = require('fs');
const http = require('http');
const url  = require('url');

// Files

const replaceTemplate = (arg1,arg2) =>{

    let output = arg1.replace(/{%NAME%}/g,arg2.name);
    // mutate let variable again
   output = output.replace(/{%AGE%}/g,arg2.age);

    return output;
}

// Having apis data
const reqData = fs.readFileSync(`${__dirname}/data.json`,'utf-8');// Only should be rendered once the object is called
const dataObj = JSON.parse(reqData);

// reading html files
const reqHTMLData = fs.readFileSync(`${__dirname}/sample.html`,'utf-8');

// Server
// Create server
// Start server to listen to reqs
const server = http.createServer((req,res)=>{
    console.log(req.url);// to capture the url
    console.log("Check point 1");

    // To get the url params
    const parsed = url.parse(req.url,true);
    
    console.log(parsed);


    const path = req.url;

    if(path === '/page'){

        res.writeHead(200,{
            'Content-type':'text/html',
        });

        const renderHTML = dataObj.map(el => replaceTemplate(reqHTMLData,el)).join('');// With join all strings are joined
        console.log(renderHTML);

        res.end(renderHTML);
    }
    else{
        res.writeHead(404,{

            'Content-type':'text/html',

        });// 404 is the status code for page not found
        res.end("<h1>Page Not found</h1>");
    }
    
});


server.listen(8080,()=>{
    console.log(`http://localhost:8080/`)
});

```
> RResult:
```
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?id=1',
  query: [Object: null prototype] { id: '1' },
  pathname: '/api',
  path: '/api?id=1',
  href: '/api?id=1'
}
```
> Optimising the code such that only required values are rendered
  
```
  // This file is for creating a simple web server
// Imports
const fs   = require('fs');
const http = require('http');
const url  = require('url');

// Files

const replaceTemplate = (arg1,arg2) =>{

    let output = arg1.replace(/{%NAME%}/g,arg2.name);
    // mutate let variable again
   output = output.replace(/{%AGE%}/g,arg2.age);

    return output;
}

// Having apis data
const reqData = fs.readFileSync(`${__dirname}/data.json`,'utf-8');// Only should be rendered once the object is called
const dataObj = JSON.parse(reqData);

// reading html files
const reqHTMLData = fs.readFileSync(`${__dirname}/sample.html`,'utf-8');

// Server
// Create server
// Start server to listen to reqs
const server = http.createServer((req,res)=>{

    // To get the url params
    const parsed = url.parse(req.url,true);
    // Using ES6 de-structuring
    const {query,pathname} = parsed;
    console.log(query.id);// Get the name in the params
    const reqIndex = query.id; 
    console.log(pathname);

    const path = req.url;

    if(pathname === '/page'){

        res.writeHead(200,{
            'Content-type':'text/html',
        });

        const reqData = dataObj[reqIndex];

        const renderHTML = replaceTemplate(reqHTMLData,reqData);

        res.end(renderHTML);
    }
    else{
        res.writeHead(404,{

            'Content-type':'text/html',

        });// 404 is the status code for page not found
        res.end("<h1>Page Not found</h1>");
    }
    
});


server.listen(8080,()=>{
    console.log(`http://localhost:8080/`)
});

  ```
 
 ### Creating own modules
  
  ```
  module.exports = (arg1,arg2) =>{

    let output = arg1.replace(/{%NAME%}/g,arg2.name);
    // mutate let variable again
   output = output.replace(/{%AGE%}/g,arg2.age);

    return output;
}
  ```
  
  > The baove code can be imported as cont replaceTemplate = require(file path);
  
  
