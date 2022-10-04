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
});

// POST
app.post('/',(req,res)=>{
    res.send(`Posting some random s**t`);
})

app.listen(PORT,()=>{
    console.log(`http://localhost:8080/`);
})