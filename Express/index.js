// This file is for creating an Express Server

// Imports
const express = require('express');
// MOngoose

const mongoose = require('mongoose');
const app = express();

// W3name
const Name = require('w3name');

// Environment variable
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

// MOngoose setup
const db = process.env.DATABASE;
const dbConnection = mongoose.connect(db);

// File management
const fs = require('fs');

// API data
const namesData = fs.readFileSync(`${__dirname}/api/names.json`,'utf-8');
const parsedData = JSON.parse(namesData);

// Keys data
const keys = fs.readFileSync(`${__dirname}/keys/keys.json`,'utf-8');
const parsedKeys = JSON.parse(keys);

// Revision data
const revision = fs.readFileSync(`${__dirname}/keys/revision.json`,'utf-8');
const parsedRevision = JSON.parse(revision);

// Middleware
app.use(express.json())

// From .env file
const PORT = 8081;

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

// Route for editing
// PUT --> update entire data
// PATCH --> Only update a part
app.patch('/api/v1/names/:id',(req,res)=>{
    const _id = parseInt(req.params.id);
    const _index = _id-1;
    // body
    const _name = req.body.name;

    parsedData[_index].name = _name

    fs.writeFile(`./api/names.json`,JSON.stringify(parsedData),()=>{
        res.send(parsedData);
    });
});


// DELETE
app.delete('/api/v1/names/:id',(req,res)=>{
    const _id = parseInt(req.params.id);

    const newData = parsedData.filter(items => items.id !== _id);

    fs.writeFile(`./api/names.json`,JSON.stringify(newData),()=>{
        res.send(newData);
    });
});

// Database
// Names Schema
// {"id":2,"name":"V the hero","age":29,"profession":"Associate","Country":"India"}
const namesSchema = new mongoose.Schema({
    name:String,
    age:Number,
    profession:String,
    Country:String

});

// Names Model
const namesModel = mongoose.model('Names',namesSchema);


app.get('/db/create',(req,res)=>{

    
    // Testing
    const testName = new namesModel({
        name:"Sneha is my best gf",
        age:29,
        profession:"Associate",
        Country:"India"
    });
    
    testName.save();

    res.send('Document created successfully');

});

// Read data from Mongo db

app.get('/db/read',async(req,res)=>{

    const readData = await namesModel.find();

    res.send(readData);

});


app.get('/db/find/:id',async(req,res)=>{

    const _id = req.params.id;

    const reqData = await namesModel.findById(_id);

    res.send(reqData);

});


app.put('/db/edit/:id',async(req,res)=>{


    const _id = req.params.id;

    const reqData = await namesModel.findById(_id);

    reqData.name = "V iero again";

    reqData.save();

    res.send(reqData);

    //updatedData.save();

});


app.delete('/db/delete/:id',async(req,res)=>{


    const _id = req.params.id;

    try{

        await namesModel.findByIdAndDelete(_id,()=>{

            res.send("Success");

        });


    }catch(err){
        console.log(err);
        res.send('Unsuccessful');
    }


});

// IPNS

// w3names keys
// create name
app.get('/name/create',async(req,res)=>{

    const name = await Name.create();

    parsedKeys.push(name.key.bytes);

    // Writing to the data
    //fs.writeFile(path,content,err =>{});
    fs.writeFile(`./keys/keys.json`,JSON.stringify(parsedKeys),err=>{
        if(err){
            console.log(err);
        }else{
            res.send('Done');
        }
    });


});

// publish content
app.get('/name/publish', async(req,res)=>{

    // value is an IPFS path to the content we want to publish
    const value = '/ipfs/bafybeicibiahb2rnglejmzexodmtfjrns6opvwtafwvgwnaic4sgfw6lde';

    // Get the name from bytes data
    const name = await Name.from(parsedKeys[0].data);

    // since we don't have a previous revision, we use Name.v0 to create the initial revision
    const revisionZero = await Name.v0(name, value);

    console.log(revisionZero);

    
            Name.publish(revisionZero, name.key).then(res =>{
                console.log("Success");
            }).catch(err =>{
                console.log(err);
            });
        


});

// Revision
app.get('/name/revision',async(req,res)=>{

    const nextValue = '/ipfs/bafybeidjazgigbiflpjymy2uw33ybbp7vpt5zxhkrklu44cj7vk5rcrrhy';

    // Get the name from bytes data
    const name = await Name.from(parsedKeys[0].data);

    // Latest revision
    const revision = await Name.resolve(name);

    // Make a revision to the current record (increments sequence number and sets value)
    const nextRevision = await Name.increment(revision, nextValue);

    Name.publish(nextRevision, name.key).then(res =>{
        console.log("Success");
    }).catch(err =>{
        console.log(err);
    });


});

// latest
app.get('/name/latest',async(req,res)=>{

    // Get the name from bytes data
    const name = await Name.from(parsedKeys[0].data);

    // Latest revision
    const revision = await Name.resolve(name);

    console.log(revision);

    console.log(name.toString());


})


app.listen(PORT,()=>{
    console.log('..............');
    console.log(`http://localhost:${PORT}/`);
});