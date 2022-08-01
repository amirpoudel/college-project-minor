const database = require('./database/database');
const express = require('express');
const app = express();

const port = 8000;


database.connectDatabase();

database.createAdmin();
database.createUser();
database.createCandidate();
database.createVote();


app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.listen(port,()=>{
    console.log(`listen at ${port}`);
})






