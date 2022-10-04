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








