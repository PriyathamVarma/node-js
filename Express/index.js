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
// Middleware
app.use(express.json())

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
app.post('/api/v1/names',(req,res)=>{

    // We need app.use(express.json()) middleware to post the data
    /*const first = {x: 1, y: 2, z: 3};  
    const second = Object.assign({x: 3, z: 4, w: 5}, first); */ 

    //const dataToBeInserted = {id:4,name:"New naming",profession:"Not yet decided",Country:"UK"};
    const _id = namesData.length-1; 
    const newData = Object.assign({id:_id},req.body);

    // Adding the data
    parsedData.push(newData);

    // Writing to the data
    //fs.writeFile(path,content,err =>{});
    fs.writeFile(`./api/names.json`,JSON.stringify(parsedData),err=>{
        if(err){
            console.log(err);
        }else{
            res.send('Done');
        }
    });

    
});

app.listen(PORT,()=>{
    console.log(`http://localhost:8080/`);
})