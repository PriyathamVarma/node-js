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
