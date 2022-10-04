# This file is for explaining express and how to build an Express server

- Express is built on top of NodeJS
- Express is written in NodeJS
- Express have easy routing to handle requests and responses
- Middleware features
- Server-side rendering
- best for organising MVC architecture

## Postman([Postman](https://www.postman.com/))

> Postman is used for API management

### Setting up basic express server

> npm init

> npm i express

> Create the index.js file for creating the express code

> Basic Body for Express app

```
// This file is for creating an Express Server

// Imports
const express = require('express');
const app = express();
const PORT = 8080;

console.log(app);

app.listen(PORT,()=>{
    console.log(`http://localhost:8080/`);
})

```

### Routing

```
// This file is for creating an Express Server

// Imports
const express = require('express');
const app = express();
const PORT = 8080;

// Data
const msg = {

    name : 'varma',
    age  : 29,
    Profession: 'Course Director'

}

// ROUTING
// URL ---> /
app.get('/',(req,res)=>{
    res.send('You entered /');
});

app.get('/new',(req,res)=>{
    //res.status(200).send(msg);// this cant work bcoz you can send only JSON or text or HTML
    res.status(200).json(msg);
})

app.listen(PORT,()=>{
    console.log(`http://localhost:8080/`);
})

```
### REST(Representational State transfer)

```

// This file is for creating an Express Server

// Imports
const express = require('express');
const app = express();
const PORT = 8080;
// File management
const fs = require('fs');
// API data
const namesData = fs.readFileSync(`${__dirname}/api/names.json`,'utf-8');
const parsedData = JSON.parse(namesData);

// ROUTING
// URL ---> /
app.get('/api/v1/names',(req,res)=>{
    res.status(200).json({
        status:'Success',
        data:{
            parsedData
        }
    });
});

// POST
app.post('/',(req,res)=>{
    res.send(`Posting some random s**t`);
})

app.listen(PORT,()=>{
    console.log(`http://localhost:8080/`);
})

```









