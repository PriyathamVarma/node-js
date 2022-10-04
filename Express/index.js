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